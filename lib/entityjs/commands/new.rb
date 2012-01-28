require 'fileutils'

module Entityjs
  
  class New
    
    def self.generate(args)
      name = args.first
      comps = args[2..-1] || []
      
      template = Entityjs::template
      
      if !Dir.exists?(name)
        FileUtils.mkdir(name)
      end
      
      FileUtils.cp_r template, name
      
      puts "Created: #{name}"
      puts "Path: ./#{name}"
      puts "Version: #{Entityjs::VERSION}"
      puts "Website: http://entityjs.com"
      puts ""
      
      Dirc.change_dir(name)
      
      comps.each do |c|
        Entityjs::Command.run('comp', c)
      end
      
      Entityjs::Command.run('refresh')
      
      return true
    end
    
  end
  
end