require 'fileutils'

module Entityjs
  
  class Dirc
    
    def self.find_src_files(ignore=[], order=[])
      
      return Dir["src/**/*.js"]
      
    end
    
    def self.find_entity_files
      root = Dirc.get_root_path

      ents = Dir[root+"/src/**/*.js"]
      
      #push re.js to the top
      
      i = ents.index{|i| i.match(/re\.js$/) }
      
      if i.nil?
        puts 'Error cannot find re.js!'
        return ents
      end
      
      k = ents.delete_at(i)
      
      ents.unshift(k)
      
      return ents
    end
    
    def self.get_root_path
      
      return File.expand_path(File.dirname(__FILE__)+'/../..')
    end
    
    def self.get_license
      f = File.open(self.get_root_path+'/license.txt', 'r')
      
      contents = f.read
      
      contents = contents.sub(/\$VERSION/, Entityjs::VERSION)
      
      return contents
    end
      
    def self.set_root(root)
      @root = root
    end
    
    def self.change_dir(name)
      Dir.chdir(Dir.pwd+'/'+name)
    end
    
    def self.get_root(path)
      cut = Dir.pwd.split(@root)
      
      if cut.length == 2
        path = cut.pop+path
      end
      
      return path
    end
    
    def self.create_dir(name, move=false)
    
    path = self.get_root("/#{name}")
    
      begin
        Dir::mkdir(name)
        puts "Created: #{path}"
      rescue
        puts "Directory: #{path} already exists!"
      end
      
      if move
        self.change_dir(name)
      end
    end
    
    def self.create_file(name, contents)
      File.open(name, "w+") {|f| f.write(contents)}
    end
    
    def self.copy_file(name, new_name=nil)
      
      if new_name.nil?
        new_name = name
      end
      
      template = self.get_root_path+'/blank/'+name
      ::FileUtils.cp template, new_name
      
      path = "/#{name}"
      
      path = self.get_root(path)
      
      puts "Created: #{path}"
    end
    
  end
  
end