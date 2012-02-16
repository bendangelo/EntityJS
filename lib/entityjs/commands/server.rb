module Entityjs
  
  class Server < Sinatra::Base
    
    def self.run(args)
      
      if !Dirc.game?
        return 2
      end
      
      set :public_folder, Dirc.game_root
      
      puts "Your game is here:"
      puts "  http://localhost:2345/"
      puts ""
      puts "Your tests are here:"
      puts "  http://localhost:2345/tests"
      puts ""
      
      Entityjs::Server.run! :port=>2345
    end
    
    get '/' do
      
      Assets.set_vars(IO.read("#{Entityjs::root}/public/play.html"))
      
    end
    
    get '/tests' do
      
      Assets.set_vars(IO.read("#{Entityjs::root}/public/tests.html"), true)
      
    end
    
    get '/entityjs/*' do
      content_type 'text/javascript'
      IO.read(Entityjs::root+'/src/'+params[:splat].first)
    end
    
    get '/qunit/*' do
      file = params[:splat].first
      if file.match /\.js$/
        content_type 'text/javascript'
      else
        content_type 'text/css'
      end
      
      IO.read(Entityjs::root+"/public/qunit/#{file}")
    end
    
    
  end
  
end