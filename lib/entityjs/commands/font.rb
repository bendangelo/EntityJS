module Entityjs
  
  class Font
    
    def self.generate(name)
      if !Dirc.game?
        return 2
      end
      puts 'not implemented yet'
      return 0
      
      tests = []
      
      if name.class == Array
        tests = name[1..-1]
        
        name = name.first
      end
      
      #remove extra slash
      if name[0] == '/'
        name = name[1..-1]
      end
      
      filename = name
      if name.index('.').nil?
        filename += '_test.js'
      end
      
      dir = Config.tests_folder
      
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
        
        f.write("module('#{name}');")
        
        tests.each do |i|
          f.write("\n\ntest('#{i}', function(){\n\t\n\t\n\t\n});")
        end
        
        f.close
      end
      
      puts "Created test: tests/#{filename}"
      
      Dir.chdir(Dirc.game_root)
      
      return 0
    end
    
  end
  
end