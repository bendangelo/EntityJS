require 'yaml'

module Entityjs
  
  class Config
    
    def self.file_name
      'entity.json'
    end
    
    def self.preprocess(data, ops={})
      self.instance.preprocess(data, ops)
    end

    def self.assets_folder
      return 'assets'
    end

    def self.styles_folder
      return 'styles'
    end
    
    def self.tests_folder
      'tests'
    end
    
    def self.scripts_folder
      return 'scripts'
    end
    
    def self.build_folder
      return 'build'
    end
    
    def self.sounds_folder
      self.assets_folder+'/sounds'
    end
    
    def self.images_folder
      self.assets_folder+'/images'
    end
    
    def self.instance
      if @instance.nil?
        @instance = Config.new
      end
      
      return @instance
    end
    
    def reload
      if File.exists?('config.yml')
        puts "Warning: config.yml will be deprecated soon. Rename to #{Config.file_name}"

        @data = YAML::load(IO.read('config.yml'))
      elsif File.exists?("game.json")
        data = IO.read(Config.file_name)
        @data = JSON::parse(data)
      elsif File.exists?(Config.file_name)
        data = IO.read(Config.file_name)
        @data = JSON::parse(data)
      end

    end
    
    def initialize
      self.reload
    end
    
    def width
      get_attr('width', 500)
    end
    
    def height
      get_attr('height', 400)
    end
    
    def canvas_id
      get_attr('canvas-id', 'game-canvas')
    end
    
    def canvas_container
      get_attr('canvas-container', 'canvas-container')
    end

    def scripts_ignore
      return split_attr('scripts-ignore')
    end
    
    def build_scripts_ignore
      return split_attr('build-scripts-ignore')
    end

    def tests_scripts_ignore
      return split_attr('tests-scripts-ignore')
    end

    def scripts_order
      return split_attr('scripts-order')
    end

    def assets_ignore
      return split_attr('assets-ignore')
    end
    
    def tests_ignore
      return split_attr('tests-ignore')
    end
    
    def entity_ignore
      return split_attr('entity-ignore')
    end

    #erases found lines on compiling
    #NOT implemented
    def build_erase
      return split_attr('build-erase')
    end

    #overwrites config vars during compiling
    #NOT implemented
    def build_vars

    end
    
    def build_entity_ignore
      return split_attr('build-entity-ignore')
    end

    def build_name
      return get_attr('build-name', self.title_slug+'.min')
    end

    def build_scripts_name
      return get_attr('build-scripts-name', self.build_name+'.js')
    end

    def build_styles_name
      return get_attr('build-styles-name', self.build_name+'.css')
    end

    def build_styles_ignore
      return split_attr('build-styles-ignore')
    end

    def tests_entity_ignore
      return split_attr('tests-entity-ignore')
    end

    def title
      return get_attr('title', 'game')
    end

    def title_slug
      return title.downcase.gsub(' ', '-')
    end

    def styles_ignore
      return split_attr('styles-ignore')
    end

    def build_head
      return get_attr('build-head', '')
    end

    def build_foot
      return get_attr('build-foot', '')
    end

    def build_ignore_play
      return get_attr('build-ignore-play', nil)
    end

    def build_path
      return get_attr('build-path', Config.build_folder)
    end

    def build_assets_path
      return get_attr('build-assets-path', Config.assets_folder)
    end

    def build_styles_path
      return get_attr('build-styles-path', Config.styles_folder)
    end

    def license
      contents = IO.read(Entityjs::root+'/license.txt')
      
      contents = contents.sub(/\$VERSION/, Entityjs::VERSION)
      
      return contents+"\n"
    end
    
    #replaces config variables in js/html strings with whats defined in config.json
    # say if the contents inside config.json were:
    # {"title":"My Game"}
    # All js and html files with the word RE_TITLE will be replaced with My Game
    # example, inside init.js:
    # re.ready(function(){
    #   re.title = "RE_TITLE"; //this will be replaced
    #   re.RE_TITLE //this will be replaced with My Game
    # });
    def preprocess(contents, ops={})
      
      #reload config for changes
      self.reload
      
      attrs = @data || {}

      #setup default attrs
      attrs['canvas-id'] = self.canvas_id
      attrs['width'] = self.width
      attrs['height'] = self.height
      attrs['title'] = self.title
      attrs['canvas-container'] = self.canvas_container

      attrs.each do |k,v|
        val = k.upcase

        if val == 'JS' || val == 'CSS'
          puts "Warning cannot use JS or CSS as config key. Rename it to something else!"
        end

        contents = contents.gsub("RE_#{val}", v.to_s)
      end

      #build erase

      #set width, height and canvas id
      #contents = contents.sub("RE_WIDTH", Config.instance.width.to_s)
      #contents = contents.sub("RE_HEIGHT", Config.instance.height.to_s)
      #contents = contents.sub("RE_CANVAS_ID", Config.instance.canvas_id)
      
      return contents
    end

    protected
    #returns the wanted attr from data else returns the default
    def get_attr(at, default=nil)
      if @data.nil?
        return default
      end
      
      return @data[at] || default
    end

    #returns the wanted attr in an array form
    def split_attr(at)
      if @data.nil?
        return []
      end
      
      y = @data[at]
      if !y.nil?
        if y.is_a? Array
          return y
        else
          return y.split(" ")
        end
      end
      return []
    end
    
  end
  
end