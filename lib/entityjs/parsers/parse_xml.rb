module Entityjs
  
  class ParseXML
    
    def self.parse_to_hash(contents)
      if contents.nil? || contents.empty?
        return '{}'
      end
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
      if contents.nil? || contents.empty?
        return '{}'
      end
      
      if contents.is_a? String
        contents = self.parse_to_hash(contents)
      end
      
      #to string
      contents = contents.to_json
      
      #remove @
      contents = contents.gsub('"@','"')
      
      
      #transform string-numbers into numbers
      
      return contents.gsub(/"[0-9\.]*"/){|s| s[1..-2] }
    end
    
  end
  
end