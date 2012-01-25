require 'spec_helper'

describe 'config' do
    
    before(:all) do
        setup_mygame
    end
  
    after(:all) do
      teardown_mygame
    end
  
  it 'should load config' do
    
    @config = Entityjs::Config.new('/config.yml')
    
  end
  
end