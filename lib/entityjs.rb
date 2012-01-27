require "entityjs/version"

module Entityjs
  
  def self.root
    @root = File.expand_path('../..',__FILE__)
  end
  
  def self.template
    Dir.glob("#{Entityjs::root}/template/*")
  end
  
end

require 'entityjs/command'
