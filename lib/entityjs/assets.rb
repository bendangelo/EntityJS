module Entityjs
  
  class Assets
    
    def self.to_js
      out = %Q(re.load.path = 'assets/';
      
      )
    end
    
    def self.images_to_js
      s = self.search('images').join(', ')
      
      "[#{s}]"
    end
    
    def self.sounds_to_js
      s = self.search('sounds').join(', ')
      
      "[#{s}]"
    end
    
    def self.datas_to_js
      
    end
    
    def self.search(type='*')
      images_folder = Config.instance.images_folder
      sounds_folder = Config.instance.sounds_folder
      assets_folder = Config.instance.assets_folder
      
      case type
        when 'images'
          return self.find_files(images_folder+'/*').select{|i| i.match(/^*\.(gif|png|jpg|jpeg)$/i)}
          
        when 'sounds'
          return self.find_files(sounds_folder+'/*').select{|i| i.match(/^*\.(mp3|ogg|aac|wav)$/i)}
          
        else
          return self.find_files("#{assets_folder}/*/*").select{|i| !i.match(/\/(images|sounds)\//i) && i.match(/^*\.(json)$/i)}
          
      end
      
    end
    
    def self.find_files(search)
      Dir[search].collect do |i|
        i = i.gsub("assets/", "")
      end
    end
    
  end
  
end