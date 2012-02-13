

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
      
      Dir.chdir(builds_folder)
      
      #create new directory
      if Dir.exists?(name)
        return 3
      end
      
      Dir.mkdir(name)
      Dir.chdir(name)
      
      #copy images and sounds into assets
      Dir.mkdir(assets_folder)
      Dir.chdir(assets_folder)
      
      assets_root = Dirc.game_root+'/'
      
      if Dir.exists? assets_root+images_folder
        puts "Copying images"
        FileUtils.cp_r assets_root+images_folder, 'images'
      end
      
      if Dir.exists? assets_root+sounds_folder
        puts "Copying sounds"
        FileUtils.cp_r assets_root+sounds_folder, 'sounds'
      end
      
      Dir.chdir('..')
      
      #append all files into one big file
      puts "Compiling code"
      out = ''
      
      scripts = Dirc.find_scripts(Config.instance.scripts_ignore, Config.instance.scripts_order)
      entities = Dirc.find_entity_src(Config.instance.entity_ignore)
      
      entities.each do |i|
        out += "\n"
        out += IO.read(i)
        out += "\n"
      end
      
      #add version
      out = out.gsub(/\$VERSION/, Entityjs::VERSION)
      
      scripts.each do |i|
        out += "\n"
        out += IO.read(i)
        out += "\n"
      end
      
      out += Assets.to_js
      
      
      #minify
      puts "Almost done..."
      
      license = Config.instance.license
      
      #save
      File.open('game.min.js', 'w') do |f|
        f.write(license)
        
        f.write(Uglifier.compile(out, :copyright=>false))
        
        f.close
      end
      
      
      #create play.html
      puts "Creating play page"
      
      File.open('play.html', 'w') do |f|
        f.write(%Q(<!DOCTYPE html>
<html>
  <head>
    <script src='game.min.js'></script>
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
    
  end
  
end