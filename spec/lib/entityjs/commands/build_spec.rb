require 'spec_helper'

describe 'build' do
  
  before(:all) do
    setup_mygame
  end
  
  after(:all) do
    teardown_mygame
  end
  
  it 'should build' do
    
    name = "release#{rand(999)}"
    Entityjs::Command.run('b', [name]).should == 0
    
    dir = Entityjs::Config.build_folder
    
    File.directory?(dir).should == true
    
    Dir.chdir(dir) do
      File.file?('game.min.js').should == true
      contents = IO.read('game.min.js')
      contents.should match /re\.canvas/
    end
  end
  
  it 'should generate sounds to js' do
    r = Entityjs::Build.sounds_to_js
    r.should match /\[.*\]/
    
  end
  
  it 'should generate images to js' do
    r = Entityjs::Build.images_to_js
    r.should match /\[.*\]/
    
  end
  
  
  it 'should build' do
    #compile given source
    sounds = "[]"
    images = "['blah.png']"
    canvas = 'game-canvas'
    scripts = "re.ready(function(){});"
    
    scripts += Entityjs::Build.js_config('', {:images=>images, :sounds=>sounds}, canvas)
    
    #min
    min = Entityjs::Build.minify(scripts)
    
    min.should match /Entityjs/i
  end

  it 'should build assets to js' do
    data = ["images/blah.png", "models/tree.xml"]

    Entityjs::Build.assets_to_js(data).should include("blah.png")
  end
  
end