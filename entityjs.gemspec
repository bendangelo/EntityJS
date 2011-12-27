# -*- encoding: utf-8 -*-
$:.push File.expand_path("../lib", __FILE__)
require "entityjs/version"

Gem::Specification.new do |s|
  s.name        = "entityjs"
  s.version     = Entityjs::VERSION
  s.authors     = ["Ben D'Angelo"]
  s.email       = ["ben.dangelo2@gmail.com"]
  s.homepage    = "http://entityjs.com"
  s.summary     = %q{A helper gem for developing HTML5 javascript games in EntityJS.}
  s.description = %q{A helper gem for developing HTML5 javascript games in EntityJS.}

  s.rubyforge_project = "entityjs"

  s.files         = `git ls-files`.split("\n")
  s.test_files    = `git ls-files -- {test,spec,features}/*`.split("\n")
  s.executables   = `git ls-files -- bin/*`.split("\n").map{ |f| File.basename(f) }
  s.require_paths = ["lib"]

  # specify any dependencies here; for example:
  # s.add_development_dependency "rspec"
  # s.add_runtime_dependency "rest-client"
  s.add_runtime_dependency 'uglifier'
end
