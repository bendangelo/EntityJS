require 'spec_helper'

describe 'build' do
  
  before(:all) do
    setup_mygame
  end
  
  after(:all) do
    teardown_mygame
  end
  
  it 'should run' do
    #turn this off, too much garbage made
    #Entityjs::Command.run('build', []).should == 0
  end
  
  it 'should run release1' do
    
    name = "release#{rand(999)}"
    Entityjs::Command.run('b', [name]).should == 0
    
    dir = Entityjs::Config.builds_folder+"/"+name
    
    File.directory?(dir).should == true
    
    Dir.chdir(dir) do
      contents = IO.read('game.min.js')
      
    end
  end
  
  it 'should build a throwthegame' do
    #compile given source
    images = "['images/sff.png', 'images/sddd.png']"
    sounds = "[]"
    levels = "re.e('df').attr({})"
    canvas = 'game-canvas'
    scripts = "re.ready(function(){});"
    
    scripts += Entityjs::Assets.to_js('', images, sounds, canvas, levels)
    
    #min
    min = Entityjs::Build.minify(scripts)
    
    min.should match /Entityjs/i
  end
  
end