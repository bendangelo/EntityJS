#The Compile class transforms text data into js
#This includes, xml, tmx, json, coffeescript, etc
module Entityjs
  
  class Compile
    
    def self.valid_datas
      ['xml', 'json', 'tmx', 'csv', 'yml']
    end
    
    def self.valid_scripts
      ['js', 'coffee'] + self.valid_datas
    end
    
    def self.datas_regex
      return /^.*\.#{self.valid_datas.join('|')}$/i
    end
    
    def self.valid_data?(file)
      return file.match(datas_regex) != nil
    end
    
    def self.path
      if @path.nil?
        @path = Dirc.game_root
      end
      
      @path
    end
    
    def self.path=(v)
      @path = v
    end
    
    def self.test_to_js(path, data=nil)
      if data.nil?
        #load
        data = self.read_contents(Config.tests_folder+'/'+path)
      end
      
      return self.data_to_js(path, data)
    end
    
    def self.script_to_js(path, data=nil)
      if data.nil?
        #load
        data = self.read_contents(Config.scripts_folder+'/'+path)
      end
      
      return self.data_to_js(path, data)
    end
    
    def self.data_to_js(path, data)
      js = ''
      
      if self.valid_data?(path)
        comps = path.split('/')
        js = self.data_to_entity(comps, data)
      elsif path.match /\.coffee$/
        js = self.coffee_to_js(data)
      else
        js = data
      end
      
      return js
    end
    
    #compiles data files into entities
    def self.data_to_entity(comps, data)
      if comps.is_a? String
        comps = [comps]
      end
      
      #find extension for compiling, or else treat it as json
      ext = comps.select{|i| !File.extname(i).empty? }.first
      
      if ext.nil?
        ext = '.json'
      else
        ext = File.extname(ext)
      end
      
      json = self.to_json(ext, data)
      
      return self.to_entity(comps, json)
    end
    
    #converts given comps and json into an entityjs entity
    # returns an entityjs component
    def self.to_entity(comps, json)
      
      #remove plurals
      comps.collect! do |i|
        
        #115 for ruby 1.8.7
        if i[-1] == 's' || i[-1] == 115
          i[0..-2]
        else
          i
        end
        
      end
      
      #turn into one long strng
      comps = comps.join(' ')
      
      #output entity
      return "re.e('#{comps}')\n.set(#{json})"
    end
    
    #converts the given data to json
    #the type defines the data type
    #example:
    # to_json('xml', "<map><bob>10</bob></map>")
    # => "{"bob":{$:10}}"
    def self.to_json(type, data)
      
      type.downcase!
      
      case type
        when '.json'
          return data
        when '.tmx'
          return self.tmx_to_json(data)
        when '.xml'
          return self.xml_to_json(data)
        else
          return data
      end
      
    end
    
    def self.coffee_to_js(data)
      return ParseCoffee.parse(data)
    end
    
    def self.tmx_to_json(data)
      return ParseTMX.parse(data)
    end
    
    def self.xml_to_json(data)
      return ParseXML.parse(data)     
    end
    
    #used for stubbing
    def self.read_contents(path)
      IO.read(self.path+'/'+path)
    end
    
  end
  
end