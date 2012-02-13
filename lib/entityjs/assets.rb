
module Entityjs
  
  class Assets
    
    def self.valid_datas
      ['xml', 'json', 'tmx']
    end
    
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
    
    def self.to_js
      out = %Q(
      re.load.path = 'assets/';
      re.assets = {
        images:#{self.images_to_js},
        sounds:#{self.sounds_to_js}
        };
      re.canvas = '##{Config.instance.canvas_id}';
      #{self.datas_to_js}
      )
    end
    
    def self.images_to_js
      s = self.search('images').collect{|i| "'#{i}'"}.join(', ')
      
      "[#{s}]"
    end
    
    def self.sounds_to_js
      s = self.search('sounds').collect{|i| "'#{i}'"}.join(', ')
      
      "[#{s}]"
    end
    
    def self.datas_to_js
      s = self.search
      
      out = ''
      
      s.each do |i|
        
        basename = File.basename(i)
        dirname = File.dirname(i)
        
        #make singular
        if dirname[-1] == 's'
          dirname = dirname[0..-2]
        end
        
        contents = self.data_to_json(Config.assets_folder+'/'+i)
        
        out += %Q(
        re.e('#{basename} #{dirname}')
        .attr(#{contents});
        )
        
      end
      
      
      out
    end
    
    def self.data_to_json(file)
        contents = IO.read(file)
        #remove dot from extension
        ext = File.extname(file).downcase
        
        case ext
          when '.json'
            return contents
            
          when '.tmx'
            
            return ParseTMX.parse(contents)
          
          when '.xml'
            return ParseXML.parse(contents)
            
          when '.csv'
            raise 'CSV files are not supported at the moment'
            
          when '.yml'
            raise 'YML files are not supported at the moment'
            
          else
            raise 'File '+file+' is invalid'
            
        end
      
      return nil
    end
    
    def self.search(type='*')
      images_folder = Config.images_folder
      sounds_folder = Config.sounds_folder
      assets_folder = Config.assets_folder
      
      case type
        when 'images'
          return self.find_files(images_folder+'/*').select{|i| i.match(/^*\.(gif|png|jpg|jpeg)$/i)}
          
        when 'sounds'
          return self.find_files(sounds_folder+'/*').select{|i| i.match(/^*\.(mp3|ogg|aac|wav)$/i)}
          
        else
          datas = self.valid_datas.join('|')
          return self.find_files("#{assets_folder}/*/*").select{|i| !i.match(/\/(images|sounds)\//i) && i.match(/^*\.(#{datas})$/i)}
          
      end
      
    end
    
    def self.find_files(search)
      Dir[search].collect do |i|
        i = i.gsub("assets/", "")
      end
    end
    
  end
  
end