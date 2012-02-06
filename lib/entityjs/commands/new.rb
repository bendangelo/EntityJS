require 'fileutils'

module Entityjs
  
  class New
    
    def self.generate(args)
      name = args.first
      template_name = args[1]
      
      template = Entityjs::template_path(template_name)
      
      if !Dir.exists?(name)
        FileUtils.mkdir(name)
      else
        puts "Directory already exists!"
        puts "Aborting..."
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
      
      #move back to root
      Dirc.change_dir('../..')
      
      return 0
    end
    
  end
  
end