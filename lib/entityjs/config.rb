require 'yaml'

module Entityjs
  
  class Config
    
    def self.file_name
      'config.yml'
    end
    
    def self.instance
      if @instance.nil?
        @instance = Config.new('/'+self.file_name)
      end
      
      return @instance
    end
    
    def initialize(path)
      @yml = YAML::load(File.open(Dir.pwd+path))
    end
    
    def assets_folder
      return 'assets'
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
        y.split("\n")
      end
    end
    
    def scripts_order
      y = @yml['order']
      if !y.nil?
        y.split("\n")
      end
    end
    
    def entity_ignore
      y = @yml['entity-ignore']
      if !y.nil?
        y.split("\n")
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