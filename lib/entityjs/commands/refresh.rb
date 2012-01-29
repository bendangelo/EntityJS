module Entityjs
  
  class Refresh
    
    def self.generate(args=nil)
      
      if !Dirc.game?
        return 2
      end
      
      ent = Dirc.find_entity_src
      srcs = Dirc.find_scripts
      
      merg = ent | srcs
      
      file_name = 'tmp/game.debug.js'
      
      license = Config.instance.license
      
      File.open(file_name, "w+") do |f|
        
        #add license
        f.write(license+"\n")
        
        #add files
        f.write(%Q(
        window.addEventListener\('load', function(){
        #{Assets.to_js}
        re.version = '#{VERSION}';
        
        }\);
        ))
        
        #add javascript srcs
        merg.each do |s|
        
          scrip = "<script src='#{s}' type='text/javascript'></script>"
        
          f.write("document.write(\"#{scrip}\");\n")
        end
        
      end
      
      puts "Refreshed: #{file_name}"
      
      return true
    end
    
  end
  
end