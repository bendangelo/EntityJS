require 'yaml'

module Entityjs
  
  class Config
    
    def self.file_name
      'config.yml'
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
      if File.exists?(Config.file_name)
        data = IO.read(Config.file_name)

        #replace tabs with 2 spaces
        #data = data.gsub("\t", '  ')

        @yml = YAML::load(data)
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
    
    protected
    #returns the wanted attr from yml else returns the default
    def get_attr(at, default=nil)
      if @yml.nil?
        return default
      end
      
      return @yml[at] || default
    end

    #returns the wanted attr in an array form
    def split_attr(at)
      if @yml.nil?
        return []
      end
      
      y = @yml[at]
      if !y.nil?
        return y.split(" ")
      end
      return []
    end
    
  end
  
end