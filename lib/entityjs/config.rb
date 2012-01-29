require 'yaml'

module Entityjs
  
  class Config
    
    def self.file_name
      'config.yml'
    end
    
    def self.instance
      if @instance.nil?
        @instance = Config.new
      end
      
      return @instance
    end
    
    def reload
      @yml = YAML::load(File.open(Dirc.game_root+'/'+Config.file_name))
    end
    
    def initialize()
      self.reload
    end
    
    def assets_folder
      return 'assets'
    end
    
    def tests_folder
      'tests'
    end
    
    def scripts_folder
      return 'scripts'
    end
    
    def builds_folder
      return 'builds'
    end
    
    def sounds_folder
      assets_folder+'/sounds'
    end
    
    def images_folder
      assets_folder+'/images'
    end
    
    def width
      @yml['width']
    end
    
    def height
      @yml['height']
    end
    
    def scripts_ignore
      y = @yml['scripts-ignore']
      if !y.nil?
        y.split(" ")
      end
    end
    
    def scripts_order
      y = @yml['order']
      if !y.nil?
        y.split(" ")
      end
    end
    
    def tests_ignore
      y = @yml['tests-ignore']
      if !y.nil?
        y.split(" ")
      end
    end
    
    def entity_ignore
      y = @yml['entity-ignore']
      if !y.nil?
        y.split(" ")
      end
    end
    
    def canvas_id
      @yml['canvas-id']
    end
    
    def license
      contents = IO.read(Entityjs::root+'/license.txt')
      
      contents = contents.sub(/\$VERSION/, Entityjs::VERSION)
      
      return contents+"\n"
    end
    
    
  end
  
end