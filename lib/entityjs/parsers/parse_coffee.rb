module Entityjs
  
  class ParseCoffee
    
    def self.parse(data, ops={})
      ops[:no_wrap] ||= true
      return CoffeeScript.compile(data, ops)
    end
    
  end
  
end