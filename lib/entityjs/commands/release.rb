module Entityjs
  
  #compiles entity source code
  class Release
    
    def self.generate(name=nil)
      
      if name.is_a? Array
        name = name.first
      end
      
      name ||= self.release_name
      
      puts "Collecting files"
      
      min = Entityjs::Build.compile_entity
      
      puts "Minifying"
      
      min = Entityjs::Build.minify(min)
      
      File.open(name, 'w') do |f|
        
        f.write(min)
        
      end
      
      puts "Done!"
      puts "File is at"
      puts "  ./#{name}"
      
      
      return 0
    end
    
    def self.release_name
      return "entity-#{Entityjs::VERSION}.min.js"
    end
    
  end
  
end