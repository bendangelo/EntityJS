module Entityjs
  
  class ParseTMX
    
    def self.parse(data)
      if data.nil? || data.empty?
        return '{}'
      end
      
      contents = ParseXML.parse_to_hash(data)
      
      #convert csv map into json array
      if contents['layer'].is_a? Array
        contents['layer'].each do |k|
          self.parse_layer(k)
        end
      elsif contents['layer'].is_a? Hash
        self.parse_layer(contents['layer'])
      end
      
      #transform into strin
      return ParseXML.parse(contents)
    end
    
    def self.parse_layer(k)
      if k.nil? || k.empty?
        return 
      end
      
        map = k['data']
        #remove encoding
        map.delete '@encoding'
        #convert csv to array
        tiles = map['$'].split(",\n")
        k['data']['$'] = tiles.collect{|i| i.split(',').collect{|j| j.to_i }}
      
    end
    
  end
  
end