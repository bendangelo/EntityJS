module Entityjs
  
  #outputs eunit compiled code
  class Eunit
    
    def self.generate(name=nil)
      
      if name.is_a? Array
        name = name.first
      end
      
      name ||= self.eunit_name
      
      puts "Collecting test src files"
      
      min = Entityjs::Build.compile_eunit
      
      puts "Minifying"
      
      license = "/* QUnit V1.5.0pre with EntityJS Entensions | http://docs.jquery.com/QUnit */\n"
      
      min = Entityjs::Build.minify(min, :license=>license)
      
      File.open(name, 'w') do |f|
        
        f.write(min)
        
      end
      
      puts "Done!"
      puts "File is at"
      puts "  ./#{name}"
      
      
      return 0
    end
    
    def self.eunit_name
      return "eunit-#{Entityjs::VERSION}.min.js"
    end
    
  end
  
end