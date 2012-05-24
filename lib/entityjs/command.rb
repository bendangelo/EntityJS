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
        when 'templates'
          return Entityjs::Templates.generate(args)
          
        when /^(build|b)$/
          return Entityjs::Build.generate(args)
        
        when /^(test|t)$/
          return Entityjs::Test.generate(args)
        
        when 'release'
          return Entityjs::Release.generate(args)
        when 'eunit'
          return Entityjs::Eunit.generate(args)
          
        when /^(comp|c)$/
          return Entityjs::Comp.generate(args)
          
        when /^(server|s)$/
          return Entityjs::Server.run(args)
          
        when /^(font|f)$/
          return Entityjs::Font.generate(args)
          
        when /^(html|h)$/
          return Entityjs::Html.generate(args)

        when /^(version|v|-v)$/
          puts 'EntityJS V'+Entityjs::VERSION
          return 0
          
        when /^(help|h|-h)$/
          puts ""
          puts '---- Commands ----'
          puts 'entityjs new [name]'
          puts 'entityjs new [name] [template]'
          puts 'entityjs templates'
          puts 'entityjs comp [name]'
          puts 'entityjs test [name]'
          puts 'entityjs test [name] [tests]+'
          puts 'entityjs font [name] (soon...)'
          puts 'entityjs release'
          puts 'entityjs html'
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