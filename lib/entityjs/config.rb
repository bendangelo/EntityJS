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
    
    def images_folder
      assets_folder+'/images'
    end
    
    def license
      f = File.open(Entityjs::root+'/license.txt', 'r')
      
      contents = f.read
      
      contents = contents.sub(/\$VERSION/, Entityjs::VERSION)
      f.close
      
      return contents
    end
    
    def sounds_folder
      assets_folder+'/sounds'
    end
    
  end
  
end