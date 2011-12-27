require 'spec_helper'

describe 'config' do
  
  it 'should load config' do
    
    @config = Entityjs::Config.new('/lib/blank/config.yml')
    
    @config.name.should == '$NAME'
    
  end
  
end