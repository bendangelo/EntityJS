require 'fileutils'

#The Dirc class manages all files and folders in the entityjs src and games.
module Entityjs
  
  class Dirc
    
    #is the current directory an EntityJS game?
    def self.game?
      
      #check if scripts dir exists
      if File.directory? Config.scripts_folder
      
        if @game_root.nil?
          @game_root = Dir.pwd
        end
        return true
      end
      
      return false
    end
    
    #checks if file exists in the EntityJS game
    def self.exists?(file)
      return File.file? Dirc.game_root+'/'+file
    end

    #path to EntityJS game
    def self.to_game_root
      Dir.chdir(@game_root)
    end
    
    def self.game_root
      @game_root
    end
    
    def self.find_styles(ignore=nil)
      ignore ||= []

      styles = Dir["#{Dirc.game_root}/#{Config.styles_folder}/**/*.css"].sort

      if ignore.any?
        styles.delete_if {|i| !i.match(/#{ignore.join('|')}/).nil?}
      end

      return styles
    end

    def self.find_styles_url(ignore=nil)
      styles = self.find_styles(ignore)
      
      #remove extra folders
      styles = styles.collect do |i|
        i[i.rindex(Config.styles_folder+'/')..-1]
      end

      return styles
    end

    def self.find_tests_url(ignore=nil)
      valids = Compile.valid_scripts.join(",")
      ignore ||= []
      tests = Dir["#{Dirc.game_root}/#{Config.tests_folder}/**/*.{#{valids}}"].sort
      
      tests = tests.collect do |i|
        i[i.rindex(Config.tests_folder+'/')..-1]
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
        
        i.sub(Config.scripts_folder+'/', '')
        
      end
    end
    
    def self.find_scripts_url(ignore=nil, order=nil)
      
      scripts = self.find_scripts(ignore, order)
      
      #change filenames
      scripts = scripts.collect{|k| k[k.rindex(Config.scripts_folder+'/')..-1] }
      
      return scripts
    end
    
    def self.find_entity_src_url(ignore=nil)
      srcs = self.find_entity_src(ignore)
      
      #remove src directory and replace with entityjs
      srcs = srcs.collect{|k| k[k.rindex('src/')..-1].gsub('src', 'entityjs') }
      
      return srcs
    end
    
    def self.find_scripts(ignore=nil, order=nil)
      ignore ||= []
      order ||= []
      valids = Compile.valid_scripts.join(",")
      
      scripts = Dir["#{Dirc.game_root}/#{Config.scripts_folder}/**/*.{#{valids}}"].sort
      
      #sort again by extension
      scripts.sort! {|x,y| File.extname(x) <=> File.extname(y) }
      
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
    
    def self.find_eunit_src_url(ignore=nil)
      srcs = self.find_eunit_src(ignore)
      
      #remove src directory and replace with entityjs
      srcs = srcs.collect{|k| k[k.rindex('qunit/')..-1] }
      
      return srcs
      
    end
    
    def self.find_eunit_src(ignore=nil)
      ignore ||= []
      ents = Dir[Entityjs::eunit_folder+"/**/*.js"].sort
      
      #make sure qunit is at the top
      
      i = ents.index{|i| i.match(/qunit\.js$/) }
      
      if i.nil?
        puts 'Error cannot find qunit.js!'
        return ents
      end
      
      #remove
      k = ents.delete_at(i)
      
      #push at front
      ents.unshift(k)
      
      if ignore.any?
        ents.delete_if {|i| !i.match(/#{ignore.join('|')}/).nil? }
      end
      
      return ents
    end
    
    def self.find_entity_src(ignore=nil)
      ignore ||= []

      ents = Dir[Entityjs::source_folder+"/**/*.js"]
      
      #sort by name
      ents.sort!

      #order
      order = ['re', 'extend', 'base'].reverse;
      
      #order stuff first
      order.each do |i|
        index = ents.index{|k| k.match(/#{i}\.js$/) }

        if !index.nil?
          ents.unshift ents.delete_at(index)
        end
      end

      if ignore.any?
        ents.delete_if {|i| !i.match(/#{ignore.join('|')}/).nil? }
      end
      
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
