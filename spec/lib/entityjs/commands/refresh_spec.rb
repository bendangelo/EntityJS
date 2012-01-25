require 'spec_helper'

describe 'refresh' do
  
  before(:each) do
    setup_mygame
  end
  
  it 'should refresh debug.js' do
    
    Entityjs::Refresh.generate('mygame').should == true
    
  end
  
  after(:all) do
    teardown_mygame
  end
  
end