root = File.dirname(__FILE__)+'/../'

Dir[root+"lib/entityjs/*.rb"].each {|file| require file }