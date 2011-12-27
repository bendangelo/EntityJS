module Entityjs
  class Command
    
    def self.run(command, args)
      
      case command
        when 'game'
          Game.generate(args.first, args[1..-1])
          
        when 'min'
          Min.generate(args)
        
        when 'refresh'
          Refresh.generate(args)
        
        when 'comp'
          Comp.generate(args)
          
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