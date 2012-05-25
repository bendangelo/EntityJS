

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
      if File.directory?(name)
        return 3
      end
      
      assets_root = Dirc.game_root+'/'+assets_folder
      
      Dir.mkdir(name)
      Dir.chdir(name)
      
      #copy everything inside the assets folder
      puts "Copying assets folder"
      FileUtils.cp_r assets_root, assets_folder
      
      #append all files into one big file
      puts "Compiling code"

      entity_src = self.compile_entity(Config.instance.build_entity_ignore+Config.instance.entity_ignore)
      scripts = self.compile_scripts(Config.instance.build_scripts_ignore+Config.instance.scripts_ignore, Config.instance.scripts_order)
      
      out = entity_src+scripts
      
      #minify
      puts "Almost done..."
      
      #save
      File.open(final_name, 'w') do |f|
        
        f.write(self.minify(out))
        
        f.close
      end
      
      #create play.html
      puts "Creating play page"
      
      #create play.html code
      play_code = %Q(<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1">
    <script src='#{final_name}' type='text/javascript'></script>
  </head>
  <body>
    <canvas id='#{Config.instance.canvas_id}' width='#{Config.instance.width}' height='#{Config.instance.height}'>Error browser does not support canvas element.</canvas>
  </body>
</html>
)

      #check if local play.html exists
      if Dirc::exists?('play.html')
        #create js for html
        js = "<script src='#{final_name}' type='text/javascript'></script>"
        play_code = Page::render_play(:js=>js)
      end

      File.open(html_name, 'w') do |f|
        f.write(play_code)
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
      
      #add version
      out = out.gsub(/RE_VERSION/, Entityjs::VERSION)
      
      return out
    end
    
    #finds all js inside public/qunit and compiles into one string
    def self.compile_eunit()
      out = ''
      
      units = Dirc.find_eunit_src
      
      units.each do |i|
        out += "\n"
        out += IO.read(i)
        out += "\n"
      end
      
      return out
    end
    
    #compiles all game source and returns it
    def self.compile_scripts(ignore = nil, order=nil)
      #find with short urls for proper data processing
      scripts = Dirc.find_scripts_short(ignore, order)
      
      out = ''
      
      scripts.each do |i|
        out += "\n"
        out += Compile.script_to_js(i)
        out += "\n"
      end
      
      #add js config
      out += self.js_config
      
      return out
    end
    
    #minifies source and returns it
    def self.minify(code, license=true)
      
      head = Config.instance.build_head
      foot = Config.instance.build_foot

      #leaves comments in head if they exist
      leave_comment = !head.empty?

      code = Uglifier.compile(head+code+foot, :copyright=>leave_comment)
      
      #add entity license statement
      if license.is_a? String
        code = license + code
      elsif license
        code = Config.instance.license + code
      end
      
      return code
    end
    
    def self.js_config(path = nil, images = nil, sounds = nil, canvas = nil)
      path ||= Config.assets_folder+'/'
      images ||= self.images_to_js
      sounds ||= self.sounds_to_js
      canvas ||= Config.instance.canvas_id
      
      return %Q(
      re.load.path = \"#{path}\";
      re.assets = {
        images:#{images},
        sounds:#{sounds}
        };
      re.canvas = \"##{canvas}\";
      )
    end
    
    #returns all images in a js array
    def self.images_to_js(images = nil)
      images ||= Assets.search('images')
      
      s = images.collect{|i| "'#{i}'"}.join(', ')
      
      "[#{s}]"
    end
    
    #returns all sounds in a js array
    def self.sounds_to_js(sounds = nil)
      sounds ||= Assets.search('sounds')
      
      s = sounds.collect{|i| "'#{i}'"}.join(', ')
      
      "[#{s}]"
    end
    
  end
  
end