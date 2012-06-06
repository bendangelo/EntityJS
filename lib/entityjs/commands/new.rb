require 'fileutils'

module Entityjs
  
  class New
    
    def self.generate(args)
      name = args.first || 'entityjs_game'
      template_name = args[1] || Entityjs::default_template
      
      template = Entityjs::template_path(template_name)
      
      if template.nil?
        template = Entityjs::template_path(Entityjs::default_template)
        puts "Template #{template_name} not found!"
        puts "Using default #{Entityjs::default_template} template"
      end
      
      Dirc.create_dir(name)
      
      #copy template contents
      FileUtils.cp_r template, name
      
      puts "Created: #{name}"
      puts "Template: #{template_name}"
      puts "Path: ./#{name}"
      puts "Version: #{Entityjs::VERSION}"
      puts "Website: http://entityjs.com"
      puts ""
      puts "Try it out:"
      puts "  cd #{name}"
      puts "  entityjs server"
      
      Dirc.change_dir(name)
      
      #assets
      Dirc.create_dir('assets',true)
      Dirc.create_dir('images')
      Dirc.create_dir('sounds')
      Dirc.change_dir('..')
      
      #builds
      Dirc.create_dir('builds')
      
      #scripts
      Dirc.create_dir('scripts', true)
      
      Dirc.create_dir('plugins')
      Dirc.change_dir('..')
      
      #tests
      Dirc.create_dir('tests')
      
      #move back to root
      Dirc.change_dir('..')
      
      return 0
    end
    
  end
  
end