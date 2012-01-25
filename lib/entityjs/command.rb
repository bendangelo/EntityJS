Dir["#{Entityjs::root}/lib/entityjs/*/*"].each {|f| require f }

module Entityjs
  class Command
    
    def self.run(command, args=nil)
      
      case command
        when /new|n/
          Entityjs::New.generate(args)
          
        when /build|b/
          Entityjs::Build.generate(args)
        
        when /refresh|r/
          Entityjs::Refresh.generate(args)
        
        when /test|t/
          Entityjs::Test.generate(args)
        
        when /comp|c/
          Entityjs::Comp.generate(args)
          
        when /version|v/
          puts 'EntityJS V'+Entityjs::VERSION
          
        when /help|h/
          puts 'entityjs new [name] [comp]+'
          puts 'entityjs comp [name]'
          puts 'entityjs test [name]'
          puts 'entityjs build'
          puts 'entityjs refresh'
          puts 'entityjs version'
          
      end
      
      return 0
    end
    
  end
end