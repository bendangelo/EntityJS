#The Compile class transforms text data into js
#This includes, xml, tmx, json, coffeescript, etc
module Entityjs
  
  class Compile
    
    def self.valid_datas
      ['xml', 'json', 'tmx', 'csv', 'yml']
    end
    
    def self.datas_regex
      return /^.*\.#{self.valid_datas.join('|')}$/i
    end
    
    def self.valid_data?(file)
      return file.match(datas_regex) != nil
    end
    
    def path
      if @path.nil?
        @path = ''
      end
      
      @path
    end
    
    def path=(v)
      @path = v
    end
    
    def self.script_to_js(path, data=nil)
      if data.nil?
        #load
        data = IO.read(self.path+'/'+path)
      end
      
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
      ext = comps.select{|i| !File.extname(i).empty? } || '.json'
      
      json = self.to_json(ext, data)
      
      return self.to_entity(comps, json)
    end
    
    #converts given comps and json into an entityjs entity
    # returns an entityjs component
    def self.to_entity(comps, json)
      
      #remove plurals
      comps.collect do |i|
        
        if i[-1] == 's'
          return i[0..-2]
        end
        return i
      end
      
      %Q(re.e('#{comps}')
      .attr(#{data}))
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
    
  end
  
end