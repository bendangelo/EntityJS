
require 'entityjs/dirc'
require 'entityjs/game'
require 'entityjs/min'
require 'entityjs/refresh'
require 'entityjs/comp'
require 'entityjs/version'
require 'entityjs/config'

module Entityjs
  class Command
    
    def self.run(command, args=nil)
      #load config first
      Entityjs::Config.instance
      
      case command
        when 'new'
          Entityjs::Game.generate(args.first, args[2..-1])
          
        when 'min'
          Entityjs::Min.generate(args)
        
        when 'refresh'
          Entityjs::Refresh.generate(args)
        
        when 'comp'
          Entityjs::Comp.generate(args)
          
        when 'version'
          puts 'Current EntityJS V'+Entityjs::VERSION
          
        else
          puts 'Error enter in one of the following...'
          puts 'entityjs new [name] [comp]+'
          puts 'entityjs comp [name]'
          puts 'entityjs min'
          puts 'entityjs refresh'
          
      end
    end
    
  end
end