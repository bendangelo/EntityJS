RSpec.configure do |config|
  # Use color in STDOUT
  config.color_enabled = true

  # Use color not only in STDOUT but also in pagers and files
  config.tty = true

  # Use the specified formatter
  #config.formatter = :documentation # :progress, :html, :textmate
end


root = File.dirname(__FILE__)+'/..'


Dir[root+'/spec/support/*'].each {|f| require f}

require "#{root}/lib/entityjs"

Dir[root+"/lib/entityjs/*.rb"].each {|file| require file }

