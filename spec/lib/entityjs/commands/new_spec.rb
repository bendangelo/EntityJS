require 'spec_helper'

describe 'new' do
  
  it 'should generate mygame' do
    
    Entityjs::New.generate('mygame').should == true
    
  end
  
  it 'should not generate with incorrect name'
  
  it 'should generate mygame with comps'
  
end