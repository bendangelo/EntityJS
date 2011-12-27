require 'yaml'

module Entityjs
  
  class Config
    
    def instance
      if @instance.nil?
        @instance = Config.new
      end
      
      return @instance
    end
    
    def initialize
      @yml = YAML::load(File.open(Dir.pwd+"/config.yml"))
    end
    
    def name
      return @yml[:name]
    end
    
  end
  
end