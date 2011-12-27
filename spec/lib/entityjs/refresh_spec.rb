require 'spec_helper'

describe 'refresh' do
  
  before(:each) do
    root = File.dirname(__FILE__)+'/../../../mygame'
    Dir.chdir(root)
  end
  
  it 'should refresh debug.js' do
    
    Entityjs::Refresh.generate('mygame').should == true
    
  end
  
end