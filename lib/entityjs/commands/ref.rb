module Entityjs
  
  class Ref
    
    def self.generate(args=nil)
      
      ent = Dirc.find_entity_files
      srcs = Dirc.find_scripts
      
      merg = ent | srcs
      
      Dirc.change_dir('tmp')
      
      file_name = 'game.debug.js'
      
      license = Dirc.get_license
      
      File.open(file_name, "w+") do |f|
        
        f.write(license+"\n")
        
        merg.each do |s|
        
          scrip = "<script src='#{s}' type='text/javascript'></script>"
        
          f.write("document.write(\"#{scrip}\");\n")
        end
        
      end
      
      puts "Refreshed /tmp/#{file_name}"
      
      return true
    end
    
  end
  
end