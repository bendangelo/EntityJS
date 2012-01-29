module Entityjs
  
  class Comp
    
    def self.generate(name)
      if !Dirc.game?
        return 2
      end
      
      if name.class == Array
        name = name.first
      end
      
      #remove extra slash
      if name[0] == '/'
        name = name[1..-1]
      end
      
      filename = name
      if name.index('.').nil?
        filename += '.js'
      end
      
      dir = Config.instance.scripts_folder
      
      Dirc.change_dir(dir)
      
      #create folder if they don't exist
      folders = filename.split('/')
      filename = folders.pop
      
      if folders.size > 0
        folders.each do |i|
          if !Dir.exists?(i)
            Dir.mkdir(i)
          end
          
          Dirc.change_dir(i)
        end
        
      end
      
      if File.exists?(filename)
        return 3
      end
      
      File.open(filename, 'w') do |f|
        
        f.write(%Q(re.c\('#{name}'\)
.requires\(''\)
.defines\({
  
}\)
.init\(function\(\){
  
}\)
.dispose\(function\(\){
  
}\);
))
        
        f.close
      end
      
      puts "Created comp: scripts/#{filename}"
      
      Dir.chdir(Dirc.game_root)
      
      return 0
    end
    
  end
  
end