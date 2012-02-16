module Entityjs
  
  class Templates
    
    def self.generate(args)
      
      puts "Available Templates:"
      temps = Dir[Entityjs::root+'/templates/*'].sort
      
      temps.each do |i|
        k = i.split('/').pop
        default = ''
        
        if k == Entityjs::default_template
          default = " -default"
        end
        puts "  #{k}#{default}"
      end
      
      puts ""
      puts "Run 'entityjs new [name] [template]'"
      
      return 0
    end
    
  end
  
end