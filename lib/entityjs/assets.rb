
module Entityjs
  
  class Assets
    
    def self.search(type='*')
      images_folder = Config.images_folder
      sounds_folder = Config.sounds_folder
      assets_folder = Config.assets_folder
      
      case type
        when 'images'
          return self.find_files(images_folder+'/.*').select{|i| i.match(/^.*\.(gif|png|jpg|jpeg)$/i)}
          
        when 'sounds'
          return self.find_files(sounds_folder+'/.*').select{|i| i.match(/^.*\.(mp3|ogg|aac|wav)$/i)}
          
        else
          return self.search_datas
          
      end
      
    end
    
    def self.search_datas
      #TODO: find all other folders and generate a key in re.assets
      return self.find_files("#{Config.assets_folder}/*/*").select{|i| i.match(/(images|sounds)\//i) == nil }
    end
    
    def self.find_files(search)
      Dir[Dirc.game_root+'/'+search].collect do |i|
        #remove long string
        i = i.split("assets/").pop
      end
    end
    
  end
  
end