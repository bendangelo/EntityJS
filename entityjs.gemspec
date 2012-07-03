# -*- encoding: utf-8 -*-
$:.push File.expand_path("../lib", __FILE__)
require "entityjs/version"

Gem::Specification.new do |s|
  s.name        = "entityjs"
  s.version     = Entityjs::VERSION
  s.authors     = ["Ben D'Angelo"]
  s.email       = ["ben@entityjs.com"]
  s.homepage    = "http://entityjs.com"
  s.summary     = %q{Create HTML5 javascript games in EntityJS.}
  s.description = %q{HTML5 Javascript game engine, quickly create robust, flexible and reusable games.}
  
  s.license = 'MIT'
  
  s.rubyforge_project = "entityjs"
  
  s.files         = `git ls-files`.split("\n")
  s.test_files    = `git ls-files -- {test,spec,features}/*`.split("\n")
  s.executables   = `git ls-files -- bin/*`.split("\n").map{ |f| File.basename(f) }
  s.require_paths = ["lib"]
  
  s.add_development_dependency "rspec"
  s.add_development_dependency "jasmine"
  
  s.add_dependency "sinatra", ">= 1.3.0"
  s.add_dependency "coffee-script"
  s.add_dependency 'uglifier'
  s.add_dependency 'json'
  s.add_dependency 'cobravsmongoose'
  s.add_dependency 'cssmin'
  
end
