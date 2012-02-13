module Entityjs
  
  class ParseTMX
    
    def self.parse(data)
      
      contents = ParseXML.parse_to_hash(data)
      
      #convert csv map into json array
      if contents['layer'].is_a? Array
        contents['layer'].each do |k|
          self.parse_layer(k)
        end
      else
        self.parse_layer(contents['layer'])
      end
      
      #transform into string
      out = ParseXML.parse(contents)
      
      #transform string-numbers into numbers
      
      out = out.gsub(/"[0-9\.]*"/){|s| s[1..-2] }
      
      return out
    end
    
    def self.parse_layer(k)
      
        map = k['data']
        #remove encoding
        map.delete '@encoding'
        #convert csv to array
        tiles = map['$'].split(",\n")
        k['data']['$'] = tiles.collect{|i| i.split(',').collect{|j| j.to_i }}
      
    end
    
  end
  
end