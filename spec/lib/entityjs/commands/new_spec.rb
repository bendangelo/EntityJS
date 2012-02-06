require 'spec_helper'

describe 'new' do
  
  it 'should generate mygame' do
    
    Entityjs::New.generate(['mygame']).should == 0
    Dir.pwd.should match /\/EntityJS$/i
    
  end
  
  it 'should generate mygame with comps' do
    Entityjs::New.generate(['mygame', 'comp1']).should == 0
    Dir.pwd.should match /\/EntityJS$/i
    
    File.exists?('mygame/scripts/init.js').should == true
    File.exists?('mygame/scripts/game.js').should == true
  end
  
end