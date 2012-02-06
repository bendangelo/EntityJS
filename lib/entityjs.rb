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
