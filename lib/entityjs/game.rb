module Entityjs
  
  class Game
    
    def self.generate(name, comps=[])
      
      #create directory
      self.create_dir(name)
      
      Dir.chdir(Dir.pwd+'/'+name)
      
      #create html file
      File.open("#{name}.html", "w") {|f| f.write('test html') }
      puts "created #{name}.html"
      
      #create src directory
      self.create_dir('src')
      p
      
      #create test directory
      self.create_dir('test')
      
      return true
    end
    
    def self.create_dir(name)
      begin
        Dir::mkdir(name)
        puts "created #{name} directory"
      rescue
        puts "directory #{name} already exists!"
      end
    end
    
  end
  
end