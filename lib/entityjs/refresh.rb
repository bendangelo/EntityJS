module Entityjs
  
  class Refresh
    
    def self.generate(args=nil)
      
      Config.instance
      
      ent = Dirc.find_entity_files
      srcs = Dirc.find_src_files
      
      merg = ent | srcs
      
      Dirc.change_dir('lib')
      
      name = Config.instance.name
      
      file_name = name+'.debug.js'
      
      license = Dirc.get_license
      
      File.open(file_name, "w+") do |f|
        
        f.write(license+"\n")
        
        merg.each do |s|
        
          scrip = "<script src='#{s}' type='text/javascript'></script>"
        
          f.write("document.write(\"#{scrip}\");\n")
        end
        
      end
      
      puts "Refreshed /lib/#{file_name}"
      
      return true
    end
    
  end
  
end