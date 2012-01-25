require 'spec_helper'

describe 'ref' do
  
  before(:each) do
    setup_mygame
  end
  
  it 'should refresh debug.js' do
    
    Entityjs::Ref.generate('mygame').should == true
    
  end
  
  after(:all) do
    teardown_mygame
  end
  
end