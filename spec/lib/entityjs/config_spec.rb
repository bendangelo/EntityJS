require 'spec_helper'

describe 'config' do
  
  it 'should load config' do
    
    @config = Entityjs::Config.new('/config.yml')
    
  end
  
end