module Entityjs
  
  class Refresh
    
    def self.generate(args=nil)
      
      if !Dirc.game?
        return 2
      end
      
      ent = Dirc.find_entity_files
      srcs = Dirc.find_scripts
      
      merg = ent | srcs
      
      file_name = 'tmp/game.debug.js'
      
      license = Dirc.get_license
      
      File.open(file_name, "w+") do |f|
        
        #add license
        f.write(license+"\n")
        
        #add javascript srcs
        merg.each do |s|
        
          scrip = "<script src='#{s}' type='text/javascript'></script>"
        
          f.write("document.write(\"#{scrip}\");\n")
        end
        
        #add files
        f.write(Assets.to_js)
        
      end
      
      puts "Refreshed: #{file_name}"
      
      return true
    end
    
  end
  
end