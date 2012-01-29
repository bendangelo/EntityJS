require 'spec_helper'

describe 'build' do
  
  before(:all) do
    setup_mygame
  end
  
  after(:all) do
    teardown_mygame
  end
  
  it 'should run' do
    Entityjs::Command.run('build').should == 0
  end
  
  it 'should run release1' do
    Entityjs::Command.run('b', ["release#{rand(999)}"]).should == 0
  end

end