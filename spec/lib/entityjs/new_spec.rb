require 'spec_helper'

describe 'new' do
  
  it 'should generate new mygame' do
    
    Entityjs::New.generate('mygame').should == true
    
  end
  
end