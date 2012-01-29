require 'sinatra/base'

module Entityjs
  
  class Server < Sinatra::Base
    
    get '/' do
      
      contents = IO.read("#{Entityjs::root}/public/play.html")
      
      contents.gsub("$WIDTH", Config.instance.width)
      contents.gsub("$HEIGHT", Config.instance.height)
      contents.gsub("$CANVAS_ID", Config.instance.canvas_id)
      contents.gsub("$JS", "")
      
    end
    
    get '/tests' do
      'Testing stuff soon to come...'
    end
    
  end
  
end