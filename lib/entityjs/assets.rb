
module Entityjs
  
  class Assets
    
    def self.valid_datas
      ['xml', 'json', 'tmx', 'csv', 'yml']
    end
    
    def self.datas_regex
      return /^.*\.#{self.valid_datas.join('|')}$/i
    end
    
    #converts all assets / info into a js game header
    def self.to_js(path = nil, images = nil, sounds = nil, canvas = nil)
      path ||= 'assets/'
      images ||= self.images_to_js
      sounds ||= self.sounds_to_js
      canvas ||= Config.instance.canvas_id
      
      return %Q(
      re.load.path = '#{path}';
      re.assets = {
        images:#{images},
        sounds:#{sounds}
        };
      re.canvas = '##{canvas}';
      )
    end
    
    #converts all data files in /assets/ into js code
    def self.datas_to_js
      s = self.search
      
      out = ''
      
      s.each do |i|
        
        file = i
        data = IO.read(Dirc.game_root+'/'+Config.assets_folder+'/'+i)
        
        out += self.data_to_js(i, data)
        
      end
      
      
      out
    end
    
    #converts the given file name and data into js code
    def self.data_to_js(file, data)
      contents = self.data_to_json(file, data)
      
      basename = File.basename(file)
      dirname = File.dirname(file)
      
      comps = []
      
      dirname.split('/').each do |i|
        
        #make singular
        if i[-1] == 's'
          i = i[0..-2]
        end
        
        comps.push i
        
      end
      
      #remove dot because no base dir was given
      comps.delete_if{|i| i=='.'}
      
      %Q(
      re.e('#{basename} #{comps.join(' ')}')
      .attr(#{contents});
      )
    end
    
    #converts the given data into json
    def self.data_to_json(file, data)
      ext = file.downcase
      
        case ext
          when /json$/
            return data
            
          when /tmx$/
            
            return ParseTMX.parse(data)
          
          when /xml$/
            return ParseXML.parse(data)
            
          when /csv$/
            raise 'CSV files are not supported at the moment'
            
          when /yml$/
            raise 'YML files are not supported at the moment'
            
          else
            return data
            
        end
        
    end
    
    def self.file_to_json(file)
        contents = IO.read(file)
        
        return self.data_to_json(file, contents)
    end
    
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
      return []
      #return self.find_files("#{Config.assets_folder}/*/*").select{|i| !i.match(/\/(images|sounds)\//i) && i.match(self.datas_regex)}
    end
    
    def self.find_files(search)
      Dir[Dirc.game_root+'/'+search].collect do |i|
        #remove long string
        i = i.split("assets/").pop
      end
    end
    
  end
  
end