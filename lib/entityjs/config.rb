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
    
    def name
      return @yml['name']
    end
    
  end
  
end