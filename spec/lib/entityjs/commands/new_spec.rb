require 'spec_helper'

describe 'new' do
  
  it 'should generate mygame' do
    
    Entityjs::New.generate(['mygame']).should == 0
    
  end
  
  it 'should generate mygame with comps' do
    Entityjs::New.generate(['mygame', 'comp1', 'comp2']).should == 0
    
    File.exists?('mygame/scripts/comp1.js').should == true
    File.exists?('mygame/scripts/comp2.js').should == true
  end
  
end