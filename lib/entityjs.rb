begin
  require "cobravsmongoose" 
rescue LoadError
  puts "Could not load 'cobravsmongoose'"
  puts "run 'gem install cobravsmongoose'"
  exit
end

begin
  require "json" 
rescue LoadError
  puts "Could not load 'json'"
  puts "run 'gem install json'"
  exit
end

begin
  require "uglifier" 
rescue LoadError
  puts "Could not load 'uglifier'"
  puts "run 'gem install uglifier'"
  exit
end

begin
  require "sinatra/base" 
rescue LoadError
  puts "Could not load 'sinatra'"
  puts "run 'gem install sinatra'"
  exit
end

require "entityjs/version"

module Entityjs
  
  def self.root
    @root = File.expand_path('../..',__FILE__)
  end
  
  def self.default_template
    'platform'
  end
  
  def self.template_path(name=nil)
    if name.nil? || name.empty?
      name = self.default_template
    end
    path = "#{Entityjs::root}/templates/#{name}"
    if Dir.exists? path
        return Dir.glob(path+'/*')
    else
        return nil
    end
  end
  
end

require 'entityjs/command'
