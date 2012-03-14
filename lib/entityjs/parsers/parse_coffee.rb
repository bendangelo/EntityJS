module Entityjs
  
  class ParseCoffee
    
    def self.parse(data)
      return CoffeeScript.compile(data)
    end
    
  end
  
end