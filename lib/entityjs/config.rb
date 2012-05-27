require 'yaml'

module Entityjs
  
  class Config
    
    def self.file_name
      'config.json'
    end
    
    def self.preprocess(data, ops={})
      self.instance.preprocess(data, ops)
    end

    def self.assets_folder
      return 'assets'
    end
    
    def self.tests_folder
      'tests'
    end
    
    def self.scripts_folder
      return 'scripts'
    end
    
    def self.builds_folder
      return 'builds'
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
        puts "Warning: config.yml will be deprecated soon. Rename to config.json"

        @data = YAML::load(IO.read('config.yml'))

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
      return split_attr('order')
    end
    
    def tests_ignore
      return split_attr('tests-ignore')
    end
    
    def entity_ignore
      return split_attr('entity-ignore')
    end
    
    def build_entity_ignore
      return split_attr('build-entity-ignore')
    end

    def tests_entity_ignore
      return split_attr('tests-entity-ignore')
    end

    def build_head
      return get_attr('build-head', '')
    end

    def build_foot
      return get_attr('build-foot', '')
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
      
      if @data.nil?
        return contents
      end

      @data.each do |k,v|
        val = k.upcase

        if val == 'JS'
          puts "Warning cannot use JS as config key. Rename it to something else!"
        end

        contents = contents.gsub("RE_#{val}", v.to_s)
      end

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