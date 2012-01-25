require 'yaml'

module Entityjs
  
  class Config
    
    def self.instance
      if @instance.nil?
        @instance = Config.new('/config.yml')
      end
      
      return @instance
    end
    
    def initialize(path)
      @yml = YAML::load(File.open(Dir.pwd+path))
    end
    
    def assets_folder
      return 'assets'
    end
    
    def images_folder
      assets_folder+'/images'
    end
    
    def sounds_folder
      assets_folder+'/sounds'
    end
    
  end
  
end