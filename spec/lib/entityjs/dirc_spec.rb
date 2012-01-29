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
  
  it 'should return script urls' do
    Entityjs::Dirc.stub(:find_scripts).and_return(['asdfsdf/scripts/asdf.js', 'sfhs/scripts/sdf.js'])
    
    Entityjs::Dirc.find_scripts_url.should be_instance_of Array
  end
  
  it 'should return entity src urls' do
    Entityjs::Dirc.stub(:find_entity_src).and_return(['asdfsdf/src/asdf.js', 'sfhs/src/sdf.js'])
    
    Entityjs::Dirc.find_scripts_url.should be_instance_of Array
    
  end
  
end