
module Entityjs
  
  class Assets
    
    def self.valid_datas
      ['xml', 'json', 'tmx', 'csv', 'yml']
    end
    
    def self.datas_regex
      return /^.*\.#{self.valid_datas.join('|')}$/i
    end
    
    #pastes width, height and canvas-id from config file into play server
    def self.set_vars(contents, tests=false)
      #read file for changes
      Config.instance.reload
      
      contents = contents.gsub("$WIDTH", Config.instance.width.to_s)
      contents = contents.gsub("$HEIGHT", Config.instance.height.to_s)
      contents = contents.gsub("$CANVAS_ID", Config.instance.canvas_id)
      
      contents.gsub("$JS", Assets.to_html(tests))
    end
    
    #combine all sources into valid html scripts
    def self.to_html(tests=false)
      js = %Q(
      <script type='text/javascript'>
      window.addEventListener\('load', function(){
        #{Assets.to_js}
        re.version = '#{VERSION}';
        
        }\);
      </script>
)
      ent = Dirc.find_entity_src_url(Config.instance.entity_ignore)
      srcs = Dirc.find_scripts_url(Config.instance.scripts_ignore, Config.instance.scripts_order)
      
      if tests
        tests_src = Dirc.find_tests_url(Config.instance.tests_ignore)
      else
        tests_src = []
      end
      
      merg = ent | srcs | tests_src
      
      merg.each do |s|
        js += "\t<script src='#{s}' type='text/javascript'></script>\n"
      end
      js
    end
    
    #converts all assets / info into a js game header
    def self.to_js(path = nil, images = nil, sounds = nil, canvas = nil, datas = nil)
      path ||= 'assets/'
      images ||= self.images_to_js
      sounds ||= self.sounds_to_js
      canvas ||= Config.instance.canvas_id
      datas ||= self.datas_to_js
      
      return %Q(
      re.load.path = '#{path}';
      re.assets = {
        images:#{images},
        sounds:#{sounds}
        };
      re.canvas = '##{canvas}';
      #{datas}
      )
    end
    
    #returns all images in a js array
    def self.images_to_js(images = nil)
      images ||= self.search('images')
      
      s = images.collect{|i| "'#{i}'"}.join(', ')
      
      "[#{s}]"
    end
    
    #returns all sounds in a js array
    def self.sounds_to_js(sounds = nil)
      sounds ||= self.search('sounds')
      
      s = sounds.collect{|i| "'#{i}'"}.join(', ')
      
      "[#{s}]"
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
      return self.find_files("#{Config.assets_folder}/*/*").select{|i| !i.match(/\/(images|sounds)\//i) && i.match(self.datas_regex)}
    end
    
    def self.find_files(search)
      Dir[Dirc.game_root+'/'+search].collect do |i|
        #remove long string
        i = i.split("assets/").pop
      end
    end
    
  end
  
end