require 'spec_helper'

describe 'config' do
    
    before(:all) do
        setup_mygame
    end
  
    after(:all) do
      teardown_mygame
    end
  
  it 'should load config' do
    
    @config = Entityjs::Config.instance
    
  end

  it 'should rewrite vars' do
  	data = 'var sdf = RE_WIDTH'

  	Entityjs::Config.instance.preprocess(data).should_not match(/RE_WIDTH/)
  end
  
end