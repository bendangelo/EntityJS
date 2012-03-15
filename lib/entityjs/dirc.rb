require 'fileutils'

#The Dirc class manages all files and folders in the entityjs src and games.
module Entityjs
  
  class Dirc
    
    def self.game?
      
      #check if config.yml exists
      if File.file? Config.file_name
      
        if @game_root.nil?
          @game_root = Dir.pwd
        end
        return true
      end
      
      return false
    end
    
    def self.to_game_root
      Dir.chdir(@game_root)
    end
    
    def self.game_root
      
      @game_root
    end
    
    def self.find_tests_url(ignore=nil)
      valids = Compile.valid_scripts.join(",")
      ignore ||= []
      tests = Dir["#{Dirc.game_root}/#{Config.tests_folder}/**/*.{#{valids}}"].sort
      
      tests = tests.collect do |i|
        i[i.rindex('tests/')..-1]
      end
      
      if ignore.any?
        tests.delete_if {|i| !i.match(/#{ignore.join('|')}/).nil? }
      end
      
      return tests
    end
    
    #returns all game scripts with short paths
    def self.find_scripts_short(ignore=nil, order=nil)
      scripts = self.find_scripts_url(ignore, order)
      
      scripts.collect do |i|
        
        i.sub('scripts/', '')
        
      end
    end
    
    def self.find_scripts_url(ignore=nil, order=nil)
      ignore ||= []
      order ||= []
      
      scripts = self.find_scripts()
      
      #change filenames
      scripts = scripts.collect{|k| k[k.rindex('scripts/')..-1] }
      
      #ignore files
      if ignore.any?
        scripts = scripts.delete_if {|i| !i.match(/#{ignore.join('|')}/).nil? }
      end
      
      #order files
      order.reverse.each do |i|
        
        scripts.each do |s|
          
          if s.match /#{i}/
            scripts.delete(s)
            scripts.unshift(s)
          end
          
        end
        
      end
      
      return scripts
    end
    
    def self.find_entity_src_url(ignore=nil)
      ignore ||= []
      srcs = self.find_entity_src(ignore)
      
      #remove src directory and replace with entityjs
      srcs = srcs.collect{|k| k[k.rindex('src/')..-1].gsub('src', 'entityjs') }
      
      if ignore.any?
        srcs.delete_if {|i| !i.match(/#{ignore.join('|')}/).nil? }
      end
      
      return srcs
    end
    
    def self.find_scripts()
      valids = Compile.valid_scripts.join(",")
      
      return Dir["#{Dirc.game_root}/#{Config.scripts_folder}/**/*.{#{valids}}"].sort
    end
    
    def self.find_entity_src(ignore=nil)

      ents = Dir[Entityjs::root+"/src/**/*.js"]
      
      #sort by name
      ents.sort!
      
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
    
      if !File.directory? name
        Dir.mkdir(name)
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
