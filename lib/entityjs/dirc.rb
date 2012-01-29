require 'fileutils'

module Entityjs
  
  class Dirc
    
    def self.game?
      #check if config.yml exists
      return File.file? Config.file_name
    end
    
    def self.to_game_root
      Dir.chdir(@game_root)
    end
    
    def self.game_root
      if @game_root.nil?
        @game_root = Dir.pwd
      end
      
      @game_root
    end
    
    def self.find_tests_url(ignore=nil)
      Dir["#{Dirc.game_root}/#{Config.instance.tests_folder}/*/*.js"]
    end
    
    def self.find_scripts_url(ignore=nil, order=nil)
      self.find_scripts(ignore, order).collect{|k| k[k.rindex('scripts/')..-1] }
    end
    
    def self.find_entity_src_url(ignore=nil)
      self.find_entity_src(ignore).collect{|k| k[k.rindex('src/')..-1].gsub('src', 'entityjs') }
    end
    
    def self.find_scripts(ignore=nil, order=nil)
      
      return Dir["#{Dirc.game_root}/#{Config.instance.scripts_folder}/**/*.js"]
      
    end
    
    def self.find_entity_src(ignore=nil)

      ents = Dir[Entityjs::root+"/src/**/*.js"]
      
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
    
    def self.change_dir(name)
      Dir.chdir(Dir.pwd+'/'+name)
    end
    
    def self.get_root(path)
      cut = Dir.pwd.split(root)
      
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
      
      template = self.get_root_path+'/lib/blank/'+name
      ::FileUtils.cp template, new_name
      
      path = "/#{name}"
      
      path = self.get_root(path)
      
      puts "Created: #{path}"
    end
    
    def self.copy_config(name)
      self.copy_file('config.yml')
      
      f = File.open('config.yml', 'r')
      
      contents = f.read
      
      contents = contents.sub(/\$NAME/, name)
      
      File.open('config.yml', "w+") do |f|
        
        f.write(contents)
        
      end
      
    end
    
  end
  
end