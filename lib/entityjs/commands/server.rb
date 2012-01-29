require 'sinatra/base'

module Entityjs
  
  class Server < Sinatra::Base
    
    get '/' do
      'testing'
    end
    
  end
  
end