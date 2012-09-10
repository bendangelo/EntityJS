

require 'fileutils'

module Entityjs
  
  class Build
    
    def self.generate(args=nil)
      
      if !Dirc.game?
        return 2
      end
      
      Config.instance.reload
      
      build_folder = Config.instance.build_path
      assets_folder = Config.instance.build_assets_path
      images_folder = Config.images_folder
      sounds_folder = Config.sounds_folder
      scripts_folder = Config.scripts_folder
      styles_folder = Config.instance.build_styles_path
      
      final_name = Config.instance.build_scripts_name
      html_name = 'play.html'
      
      puts "Building to #{build_folder}"

      #build if it doesn't exist
      Dirc.create_dir(build_folder, true)
      
      #clear directory
      #FileUtils.rm_rf("#{build_folder}/.", :secure=> true)
      
      assets_root = Dirc.game_root+'/'+Config.assets_folder
      
      #copy everything inside the assets folder
      puts "Copying assets folder to #{assets_folder}"
      FileUtils.cp_r assets_root+'/.', assets_folder
      
      #append all files into one big file
      puts "Compiling scripts"

      out = self.compile_game
      
      puts "Minifying scripts"

      out = self.minify(out)

      puts "Minifying styles"

      css = self.minify_styles(self.compile_styles(Config.instance.build_styles_ignore))

      #minify
      puts "Almost done..."

      #save
      File.open(final_name, 'w') do |f|
        
        f.write(out)
      end
      
      #save css
      Dirc.create_dir(styles_folder)

      File.open(styles_folder+"/"+Config.instance.build_styles_name, 'w') do |f|
        f.write(css)
      end
      

      if Config.instance.build_ignore_play.nil?
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
          play_code = Page::render_play_page(:js=>js)
        end

        File.open(html_name, 'w') do |f|
          f.write(play_code)
        end
      else
        puts "Ignoring play.html"
      end
      
      puts "Build Complete!"
      puts "Build is at"
      puts "  #{build_folder}"
      
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

    def self.compile_styles(ignore = nil)
      styles = Dirc.find_styles(ignore)

      out = ''

      styles.each do |i|
        out += IO.read(i)
      end

      return Config.preprocess(out)
    end

    def self.minify_styles(styles)
      return CSSMin.minify(styles)
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
      
      out = Config.preprocess(out)

      #add js config
      out += self.js_config
      
      return out
    end
    
    def self.compile_game

      entity_src = self.compile_entity(Config.instance.build_entity_ignore+Config.instance.entity_ignore)
      scripts = self.compile_scripts(Config.instance.build_scripts_ignore+Config.instance.scripts_ignore, Config.instance.scripts_order)
      
      code = self.build_wrap(entity_src+scripts)

      #build erase
      Config.instance.build_erase.each do |i|
        #replace all finds with comments in front
        code = code.gsub(i, "//#{i}")
      end
      
      return code
    end

    def self.build_wrap(code)

      head = Config.instance.build_head
      foot = Config.instance.build_foot

      return head+code+foot
    end

    #minifies source and returns it
    def self.minify(code, ops={})
      ops[:copyright] ||= false
      ops[:license] ||= true
      
      code = Uglifier.compile(code, :copyright=>ops[:copyright])
      
      #add entity license statement
      if ops[:license].is_a? String
        code = ops[:license] + code
      elsif !ops[:license].nil?
        code = Config.instance.license + code
      end
      
      return code
    end
    
    def self.js_config(path = nil, assets = nil, canvas = nil)
      path ||= Config.assets_folder+'/'

      if assets.nil?
        assets = self.assets_to_js
      end
      if assets.is_a? Hash
        assets = assets.to_json
      end

      canvas ||= Config.instance.canvas_id
      
      return %Q(
      re.load.path = \"#{path}\";
      re.assets = #{assets};
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

    #returns all folders from assets array in a js object
    #
    #Input like this: 
    # ["images/blah.png", "images/tree.png", "models/tree.xml"]
    #
    # Is returned like this:
    # {
    #  images:["blah.png", "tree.png"],
    #  model:["tree.xml"]
    # }
    #
    def self.assets_to_js(assets = nil, ignore=nil)
      assets ||= Assets.search()
      ignore ||= Config.instance.assets_ignore

      tree = {}

      assets.each do |i|

        if ignore.any? && !i.match(/#{ignore.join('|')}/).nil?
          #ignore assets
          next
        end

        #folder
        folder = i.split('/').first

        if tree[folder].nil?
          tree[folder] = []
        end

        tree[folder].push(i)
      end

      return tree.to_json
    end
    
  end
  
end