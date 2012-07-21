require 'spec_helper'

describe 'new' do
  
  it 'should generate mygame' do
    
    Entityjs::New.generate(['mygame']).should == 0
    Dir.pwd.should match /\/EntityJS$/i
    
  end
  
  it 'should generate mygame with template' do
    Entityjs::New.generate(['mygame', 'blank']).should == 0
    Dir.pwd.should match /\/EntityJS$/i
    
    File.exists?('mygame/game.json').should == true
    File.exists?('mygame/readme.txt').should == true
  end
  
end