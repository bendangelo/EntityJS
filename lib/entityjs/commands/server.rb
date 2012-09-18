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
      puts "  http://localhost:2345/test"
      puts ""
      
      Entityjs::Server.run! :port=>2345
    end
    
    get '/' do
      
      Page.render_play_page()
      
    end
    
    get '/test' do
      
      Page.render_test_page()
      
    end

    get '/tests' do
      Page.render_test_page()
    end
    
    get '/favicon.ico' do
      content_type 'image/ico'

      Page.render_favicon
    end

    #entity source code
    get '/entityjs/*' do
      content_type 'text/javascript'
     
      Page.render_entityjs_src(params[:splat].first)
    end
    
    get '/scripts/*' do
      content_type 'text/javascript'
      
      Page.render_script(params[:splat].first)
    end
    
    get '/tests/*' do
      content_type 'text/javascript'
      
      Page.render_test(params[:splat].first)
    end
    
    #qunit testing stuff
    get '/qunit/*' do
      file = params[:splat].first
      if file.match /\.js$/
        content_type 'text/javascript'
      else
        content_type 'text/css'
      end
      
      Page.render_eunit(file)
    end
    
    
  end
  
end
