module Entityjs
  
  class ParseXML
    
    def self.parse_to_hash(contents)
      #might need different transfomration
      #remove header
      
      contents = contents.gsub(/<\?xml.*\?>/, '')
      #convert to hash
      contents = CobraVsMongoose.xml_to_hash(contents)
      
      #remove root
      contents.each do |i,v|
        if !v.nil?
          contents = v
          break
        end
      end
      
      return contents
      
    end
    
    def self.parse(contents)
      if contents.is_a? String
        contents = self.parse_to_hash(contents)
      end
      
      #to string
      contents = contents.to_json
      
      #remove @
      return contents.gsub('"@','"')
    end
    
  end
  
end