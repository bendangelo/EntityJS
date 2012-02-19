

require 'fileutils'

module Entityjs
  
  class Build
    
    def self.generate(name=nil)
      
      if !Dirc.game?
        return 2
      end
      
      Config.instance.reload
      
      if name.nil? || name.empty?
        date = Time.now.strftime('%s')
        name = "build-#{date}"
      else
        name = name.first
      end
      
      builds_folder = Config.builds_folder
      assets_folder = Config.assets_folder
      images_folder = Config.images_folder
      sounds_folder = Config.sounds_folder
      scripts_folder = Config.scripts_folder
      
      final_name = 'game.min.js'
      html_name = 'play.html'
      
      #build if it doesn't exist
      Dirc.create_dir('builds', true)
      
      #create new directory
      if Dir.exists?(name)
        return 3
      end
      
      assets_root = Dirc.game_root+'/'
      
      Dir.mkdir(name)
      Dir.chdir(name)
        
      #copy images and sounds into assets
      Dirc.create_dir(assets_folder)
      Dir.chdir(assets_folder) do
        
        if Dir.exists? assets_root+images_folder
          puts "Copying images"
          FileUtils.cp_r assets_root+images_folder, 'images'
        end
        
        if Dir.exists? assets_root+sounds_folder
          puts "Copying sounds"
          FileUtils.cp_r assets_root+sounds_folder, 'sounds'
        end
        
      end
      
      #append all files into one big file
      puts "Compiling code"
      out = ''
      
      entity_src = self.compile_entity(Config.instance.entity_ignore)
      scripts = Dirc.find_scripts(Config.instance.scripts_ignore, Config.instance.scripts_order)
      
      #add version
      out = out.gsub(/\$VERSION/, Entityjs::VERSION)
      
      scripts.each do |i|
        out += "\n"
        out += IO.read(i)
        out += "\n"
      end
      
      #add levels, animations etc data
      out += Assets.to_js
      
      
      #minify
      puts "Almost done..."
      
      #save
      File.open(final_name, 'w') do |f|
        
        f.write(self.minify(out))
        
        f.close
      end
      
      
      #create play.html
      puts "Creating play page"
      
      File.open(html_name, 'w') do |f|
        f.write(%Q(<!DOCTYPE html>
<html>
  <head>
    <script src='#{final_name}' type='text/javascript'></script>
  </head>
  <body>
    <canvas id='#{Config.instance.canvas_id}' width='#{Config.instance.width}' height='#{Config.instance.height}'>Error browser does not support canvas element.</canvas>
  </body>
</html>
))
        f.close
      end
      
      puts "Successfully built!"
      puts "Build is at"
      puts "  #{builds_folder}/#{name}"
      
      Dirc.to_game_root
      
      return 0
    end
    
    #compiles all entity source and returns it
    def self.compile_entity(ignore = nil)
      out = ''
      entities = Dirc.find_entity_src(ignore)
      entities.each do |i|
        out += "\n"
        out += IO.read(i)
        out += "\n"
      end
      
      return out
    end
    
    #compiles all game source and returns it
    def self.compile_src(ignore = nil, order=nil)
      
    end
    
    #minifies source and returns it
    def self.minify(code, license=true)
      
      code = Uglifier.compile(code, :copyright=>false)
      
      #add entity license statement
      if license
        code = Config.instance.license + code
      end
      
    end
    
  end
  
end