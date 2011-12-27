require 'spec_helper'

describe 'refresh' do
  
  it 'should refresh debug.js' do
    
    Entityjs::Refresh.generate('mygame').should == true
    
  end
  
end