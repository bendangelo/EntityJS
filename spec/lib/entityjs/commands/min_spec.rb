require 'spec_helper'

describe 'min' do
  
  before(:all) do
    setup_mygame
  end
  
  after(:all) do
    teardown_mygame
  end
  
  it 'should compile' do
    
    Entityjs::Command.run('min', []).should == 0
    
    Config.instance.stub(:min_path).and_return('build')

    dir = Config.instance.min_path
    
    File.directory?(dir).should == true
    
    Dir.chdir(dir) do
      File.file?('game.min.js').should == true
      contents = IO.read('game.min.js')
      contents.should match /re\.canvas/
    end
  end
  
end