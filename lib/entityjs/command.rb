
require 'entityjs/game'
require 'entityjs/min'
require 'entityjs/refresh'
require 'entityjs/comp'
require 'entityjs/version'

module Entityjs
  class Command
    
    def self.run(command, args=nil)
      
      case command
        when 'game'
          Entityjs::Game.generate(command, args[1..-1])
          puts 'generated game'
          
        when 'min'
          Entityjs::Min.generate(args)
        
        when 'refresh'
          Entityjs::Refresh.generate(args)
        
        when 'comp'
          Entityjs::Comp.generate(args)
          
        else
          puts 'Error enter in one of the following...'
          puts 'entityjs game [name] [comp]+'
          puts 'entityjs comp [name]'
          puts 'entityjs min'
          puts 'entityjs refresh'
          
      end
    end
    
  end
end