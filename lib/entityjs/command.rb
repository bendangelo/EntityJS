
Dir["#{Entityjs::root}/lib/entityjs/*"].each {|f| require f }

module Entityjs
  class Command
    
    def self.run(command, args=nil)
      
      case command
        when 'new'
          Entityjs::New.generate(args.first, args[2..-1])
          
        when 'min'
          Entityjs::Min.generate(args)
        
        when 'ref'
          Entityjs::Refresh.generate(args)
        
        when 'test'
          puts 'Not implemented'
        
        when 'comp'
          Entityjs::Comp.generate(args)
          
        when 'version'
          puts 'EntityJS V'+Entityjs::VERSION
          
        when 'help'
          puts 'entityjs new [name] [comp]+'
          puts 'entityjs comp [name]'
          puts 'entityjs test [name]'
          puts 'entityjs min'
          puts 'entityjs ref'
          
      end
    end
    
  end
end