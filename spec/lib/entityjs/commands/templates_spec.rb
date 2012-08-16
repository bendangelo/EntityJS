require 'spec_helper'

describe 'Templates' do
  
  it 'should display templates' do
  	Dir.chdir("..")
    Entityjs::Command.run('templates', []).should == 0
  end
  
end