require 'sinatra/base'

module Entityjs
  
  class Server < Sinatra::Base
    
    def self.run(args)
      
      if !Dirc.game?
        return 2
      end
      
      Entityjs::Server.run! :port=>2345
    end
    
    set :public_folder, Dirc.game_root
    
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
    
    get '/qunit/qunit.js' do
      content_type 'text/javascript'
      IO.read(Entityjs::root+'/public/qunit/qunit.js')
    end
    
    get '/qunit/qunit.css' do
      content_type 'text/css'
      IO.read(Entityjs::root+'/public/qunit/qunit.css')
    end
    
  end
  
end