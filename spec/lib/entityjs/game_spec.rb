require 'spec_helper'

describe 'game' do
  
  it 'should generate game mygame' do
    
    Entityjs::Game.generate('mygame').should == true
    
  end
  
end