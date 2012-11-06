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
  require "coffee-script" 
rescue LoadError
  puts "Could not load 'coffee-script'"
  puts "run 'gem install coffee-script'"
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

begin
  require "cssmin" 
rescue LoadError
  puts "Could not load 'cssmin'"
  puts "run 'gem install cssmin'"
  exit
end

module Entityjs
  
  def self.root
    @root = File.expand_path('../..',__FILE__)
  end
  
  def self.source_folder
    Entityjs::root+'/src'
  end
  
  def self.eunit_folder
    Entityjs::root+'/public/qunit'
  end
  
  def self.default_template
    'circle'
  end
  
  def self.template_path(name=nil)
    if name.nil? || name.empty?
      name = self.default_template
    end
    path = "#{Entityjs::root}/examples/#{name}"
    if File.directory? path
        return Dir.glob(path+'/*')
    else
        return nil
    end
  end

  def self.public_path
    return "#{Entityjs::root}/public"
  end

end

require 'entityjs/command'
