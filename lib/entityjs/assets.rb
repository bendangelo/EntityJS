
module Entityjs
  
  class Assets
    
    def self.valid_images
      ['gif', 'png', 'jpg', 'jpeg']
    end
    
    def self.valid_sounds
      ['mp3', 'ogg', 'aac', 'wav']
    end
    
    def self.search(type=nil)
      
      case type
        when 'images'
          images_folder = Config.images_folder
          valid_images = self.valid_images.join(',')
          return self.find_files(images_folder+"/**/*.{#{valid_images}}")
          
        when 'sounds'
          sounds_folder = Config.sounds_folder
          valid_sounds = self.valid_sounds.join(',')
          return self.find_files(sounds_folder+"/**/*.{#{valid_sounds}}")
          
        else
          return self.find_files(Config.assets_folder+'/**/*')
          
      end
      
    end
    
    def self.search_datas
      #TODO: find all other folders and generate a key in re.assets
      #DEPRECATED
      return self.find_files("#{Config.assets_folder}/*/*").select{|i| i.match(/(images|sounds)\//i) == nil }
    end
    
    def self.find_files(search)
      Dir.glob(Dirc.game_root+'/'+search).collect do |i|
        if File.file?(i)
          #remove long string
          i = i.split(Config.assets_folder+"/").pop
        end
      end.compact
      #remove nils from array too
    end
    
  end
  
end