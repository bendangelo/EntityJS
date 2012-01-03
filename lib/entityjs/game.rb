module Entityjs
  
  class Game
    
    def self.generate(name, comps=nil)
      comps ||= []
      
      Dirc.set_root(name)
      
      #create directory
      Dirc.create_dir(name, true)
      
      #create html file
      Dirc.copy_file('play.html')
      
      Dirc.copy_config(name)
      
      Config.instance
      
      Dirc.copy_file('readme.txt')
      
      #create lib
      Dirc.create_dir('lib')
      
      #create src directory
      Dirc.create_dir('src', true)
      
      Dirc.copy_file('init.js')
      Dirc.copy_file('game.js')
      
      Dirc.create_dir('display')
      
      Dirc.create_dir('plugins')
      
      Dirc.create_dir('scenes', true)
      
      Dirc.copy_file('load.js')
      Dirc.copy_file('home.js')
      
      #create assets
      Dirc.change_dir('../..')
      
      Dirc.create_dir('assets', true)
      
      Dirc.create_dir('sounds')
      
      Dirc.create_dir('images')
      
      Dirc.create_dir('levels')
      
      #create test directory
      Dirc.change_dir('..')
      Dirc.create_dir('tests', true)
      
      Dirc.create_dir('scenes')
      Dirc.create_dir('display')
      
      Dirc.change_dir('..')
      
      comps.each do |c|
        Entityjs::Command.run('comp', c)
      end
      
      Entityjs::Command.run('refresh')
      
      return true
    end
    
  end
  
end