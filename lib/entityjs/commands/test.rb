module Entityjs
  
  class Test
    
    def self.generate(name)
      if !Dirc.game?
        return 2
      end
      
      tests = []

      if name.nil?
        return 4
      end
      
      if name.is_a? Array
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
      
      test_name = filename.split('_test.').first
      
      File.open(filename, 'w') do |f|
        
        f.write("module('#{test_name}');")
        
        tests.each do |i|
          f.write("\n\ntest('#{i}', function(){\n\t\n\t\n\t\n});")
        end
        
        f.close
      end
      
      puts "Created test: #{filename}"
      
      Dir.chdir(Dirc.game_root)
      
      return 0
    end
    
  end
  
end