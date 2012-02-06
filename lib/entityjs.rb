require "entityjs/version"

module Entityjs
  
  def self.root
    @root = File.expand_path('../..',__FILE__)
  end
  
  def self.default_template
    'platform'
  end
  
  def self.template_path(name)
    if name.nil? || name.empty?
      name = 'platform'
    end
    Dir.glob("#{Entityjs::root}/template/#{name}/*")
  end
  
end

require 'entityjs/command'
