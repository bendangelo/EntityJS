require 'fileutils'

module Entityjs
  
  class New
    
    def self.generate(args)
      name = args.first
      comps = args[1..-1] || []
      
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
      
      #make blank dirs
      if !Dir.exists? 'builds'
        Dir.mkdir('builds')
      end
      
      Dirc.change_dir('scripts')
      
      if !Dir.exists? 'plugins'
        Dir.mkdir('plugins')
      end
      
      Dirc.change_dir('..')
      
      comps.each do |c|
        Entityjs::Command.run('comp', [c])
      end
      
      Entityjs::Command.run('help')
        
      return 0
    end
    
  end
  
end