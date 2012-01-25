
module Entityjs
  
  def self.root
    @root = File.expand_path('../..',__FILE__)
  end
  
end

require "entityjs/version"
require 'entityjs/command'
