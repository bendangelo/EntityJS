#The Page class renders html pages for the server
module Entityjs
  
  class Page
    
    def self.render_play
      Assets.set_vars(IO.read("#{Entityjs::root}/public/play.html"))
    end
    
    def self.render_tests
      Assets.set_vars(IO.read("#{Entityjs::root}/public/tests.html"), true)
    end
    
    def self.render_entityjs_src(path)
      path = Entityjs::root+'/src/'+path
      
      return IO.read(path)
    end
    
    def self.render_eunit(path)
      IO.read(Entityjs::root+"/public/qunit/#{path}")
    end
    
  end
  
end