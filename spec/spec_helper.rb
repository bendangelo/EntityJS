root = File.dirname(__FILE__)+'/../'

require "#{root}/lib/entityjs"
Dir[root+"lib/entityjs/*.rb"].each {|file| require file }