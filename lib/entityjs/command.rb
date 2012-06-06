Dir.glob("#{Entityjs::root}/lib/entityjs//**/*.rb").each {|f| require f }

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
        
        when '/^(release|r)$/'
          return Entityjs::Release.generate(args)

        when 'eunit'
          return Entityjs::Eunit.generate(args)
          
        when 'min'
          return Entityjs::Min.generate(args)

        when /^(comp|c)$/
          return Entityjs::Comp.generate(args)
          
        when /^(server|s)$/
          return Entityjs::Server.run(args)
          
        when /^(font|f)$/
          return Entityjs::Font.generate(args)
          
        when /^(html)$/
          return Entityjs::Html.generate(args)

        when /^(version|v|-v)$/
          puts 'EntityJS V'+Entityjs::VERSION
          return 0
          
        when /^(help|h|-h)$/
          puts ""
          puts '---- Commands ----'
          puts 'new [name]'
          puts 'new [name] [template]'
          puts 'templates'
          puts 'comp [name]'
          puts 'test [name]'
          puts 'test [name] [tests]+'
          puts 'font [name] (soon...)'
          puts 'release'
          puts 'html'
          puts 'build'
          puts 'server'
          puts 'help'
          puts 'version'
          return 0
          
      end
      
      return 1
    end
    
  end
end