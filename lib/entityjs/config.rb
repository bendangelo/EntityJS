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
      if File.exists(Config.file_name)
        @yml = YAML::load(File.open(Config.file_name))
      end
    end
    
    def initialize
      self.reload
    end
    
    def width
      if @yml.nil?
        return 500
      end
      @yml['width']
    end
    
    def height
      if @yml.nil?
        return 400
      end
      @yml['height']
    end
    
    def scripts_ignore
      if @yml.nil?
        return []
      end
      
      y = @yml['scripts-ignore']
      if !y.nil?
        y.split(" ")
      end
    end
    
    def scripts_order
      if @yml.nil?
        return []
      end
      
      y = @yml['order']
      if !y.nil?
        y.split(" ")
      end
    end
    
    def tests_ignore
      if @yml.nil?
        return []
      end
      
      y = @yml['tests-ignore']
      if !y.nil?
        y.split(" ")
      end
    end
    
    def entity_ignore
      if @yml.nil?
        return []
      end
      
      y = @yml['entity-ignore']
      if !y.nil?
        y.split(" ")
      end
    end
    
    def canvas_id
      if @yml.nil?
        return 'game-canvas'
      end
      
      @yml['canvas-id']
    end
    
    def license
      contents = IO.read(Entityjs::root+'/license.txt')
      
      contents = contents.sub(/\$VERSION/, Entityjs::VERSION)
      
      return contents+"\n"
    end
    
    
  end
  
end