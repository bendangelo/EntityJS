require 'spec_helper'

describe 'build' do
  
  
  it 'should run' do
    Entityjs::Command.run(['build']).should == 1
  end
  
  it 'should run release1' do
    Entityjs::Command.run(['build', 'release1']).should == 1
  end

end