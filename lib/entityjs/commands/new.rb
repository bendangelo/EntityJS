module Entityjs
  
  class New
    
    def self.generate(name, comps=nil)
      comps ||= []
      
      template = Dir.glob("#{Entityjs::root}/template/*")
      
      if !Dir.exists?(name)
        FileUtils.mkdir(name)
      end
      
      FileUtils.cp_r template, name
      
      Dirc.change_dir(name)
      
      comps.each do |c|
        Entityjs::Command.run('comp', c)
      end
      
      Entityjs::Command.run('ref')
      
      return true
    end
    
  end
  
end