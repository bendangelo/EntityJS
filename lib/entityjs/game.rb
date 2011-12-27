module Entityjs
  
  class Game
    
    def self.generate(name, comps=[])
      @root = name
      
      #create directory
      self.create_dir(name)
      
      Dir.chdir(Dir.pwd+'/'+name)
      
      #create html file
      create_file('play.html')
      
      create_file('config.yml')
      
      #create lib
      self.create_dir('lib')
      
      #create src directory
      self.create_dir('src')
      
      Dir.chdir(Dir.pwd+'/src')
      
      self.create_file('init.js')
      
      self.create_dir('display')
      
      self.create_dir('plugins')
      
      self.create_dir('scenes')
      
      Dir.chdir(Dir.pwd+'/scenes')
      self.create_file('load.js')
      self.create_file('home.js')
      
      #create assets
      Dir.chdir(Dir.pwd+'/../..')
      
      self.create_dir('assets')
      
      Dir.chdir(Dir.pwd+'/assets')
      
      self.create_dir('sounds')
      
      self.create_dir('images')
      
      self.create_dir('levels')
      
      #create test directory
      Dir.chdir(Dir.pwd+'/..')
      self.create_dir('tests')
      
      Dir.chdir(Dir.pwd+'/tests')
      
      self.create_dir('scenes')
      self.create_dir('display')
      
      Entityjs::Command.run('comp', comps)
      
      Entityjs::Command.run('refresh')
      
      return true
    end
    
    def self.create_file(name)
      template = File.expand_path(File.dirname(__FILE__) + '/../blank/'+name)
      FileUtils.cp template, name
      
      path = "/#{name}"
      
      cut = Dir.pwd.split(@root)
      
      if cut.length == 2
        path = cut.pop+path
      end
      
      puts "Created: #{path}"
    end
    
    def self.create_dir(name)
      begin
        Dir::mkdir(name)
        puts "Created: /#{name}"
      rescue
        puts "Directory: /#{name} already exists!"
      end
    end
    
  end
  
end