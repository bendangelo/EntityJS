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
        
        when /^(test|t)$/
          return Entityjs::Test.generate(args)
        
        when /^(comp|c)$/
          return Entityjs::Comp.generate(args)
          
        when /^(server|s)$/
          return Entityjs::Server.run(args)
          
        when /^(font|f)$/
          return Entityjs::Font.generate(args)
          
        when /^(version|v)$/
          puts 'EntityJS V'+Entityjs::VERSION
          return 0
          
        when /^(help|h)$/
          puts ""
          puts '---- Commands ----'
          puts 'entityjs new [name]'
          puts 'entityjs new [name] [comps]+'
          puts 'entityjs comp [name]'
          puts 'entityjs test [name]'
          puts 'entityjs test [name] [tests]+'
          puts 'entityjs font [name]'
          puts 'entityjs build'
          puts 'entityjs build [name]'
          puts 'entityjs server'
          puts 'entityjs help'
          puts 'entityjs version'
          return 0
          
      end
      
      return 1
    end
    
  end
end