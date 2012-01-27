require 'spec_helper'

describe 'dirc' do
  
  before(:all) do
    setup_mygame
  end
  
  after(:all) do
    teardown_mygame
  end
  
  it 'should be game dir' do
    Entityjs::Dirc.game?.should == true
  end
  
  it 'should not be game dir' do
    Dir.chdir(Dir.pwd+'/..')
    Entityjs::Dirc.game?.should == false
  end
  
end