module Entityjs
  
  class Comp
    
    def self.generate(name)
      if !Dirc.game?
        return 2
      end

      if name.nil?
        return 4
      end
      
      if name.is_a? Array
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
      
      dir = Config.scripts_folder
      
      Dirc.create_dir(dir, true)
      
      #create folder if they don't exist
      folders = filename.split('/')
      filename = folders.pop
      
      if folders.size > 0
        folders.each do |i|
          Dirc.create_dir(i, true)
        end
        
      end
      
      if File.exists?(filename)
        return 3
      end
      
      comp_name = filename.split('.').shift
      
      File.open(filename, 'w') do |f|
        
        f.write(%Q(re.c\('#{comp_name}'\)
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
      
      puts "Created comp: #{filename}"
      
      Dir.chdir(Dirc.game_root)
      
      Entityjs::Command.run('test', [name])
      
      return 0
    end
    
  end
  
end