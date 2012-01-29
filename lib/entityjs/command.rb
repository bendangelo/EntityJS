Dir.glob("#{Entityjs::root}/lib/entityjs/*.rb").each {|f| require f }
Dir.glob("#{Entityjs::root}/lib/entityjs/*/*.rb").each {|f| require f }

# 0 - ok
# 1 - command not found
# 2 - not in game directory
# 3 - file exists

module Entityjs
  class Command
    
    def self.run(command, args=nil)
      
      case command
        when /^(new|n)$/
          return Entityjs::New.generate(args)
          
        when /^(build|b)$/
          return Entityjs::Build.generate(args)
        
        when /^(refresh|r)$/
          return Entityjs::Refresh.generate(args)
        
        when /^(test|t)$/
          return Entityjs::Test.generate(args)
        
        when /^(comp|c)$/
          return Entityjs::Comp.generate(args)
          
        when /^(version|v)$/
          puts 'EntityJS V'+Entityjs::VERSION
          return 0
          
        when /^(help|h)$/
          puts '---- Commands ----'
          puts 'entityjs new [name] [comp]+'
          puts 'entityjs comp [name]'
          puts 'entityjs test [name]'
          puts 'entityjs build'
          puts 'entityjs refresh'
          puts 'entityjs version'
          return 0
          
      end
      
      return 1
    end
    
  end
end