require 'spec_helper'

describe 'Comp' do
  
  before(:all) do
    setup_mygame
    
  end
  
  after(:all) do
    teardown_mygame
  end
  
  before do
    @n = "asdf#{rand(9999999)}"
  end

  it 'should create init.js' do
    
    Entityjs::Comp.generate("#{@n}.js").should == 0
    
    File.exists?("scripts/#{@n}.js").should == true
  end
  
  it 'should create init' do
    
    Entityjs::Comp.generate(@n).should == 0
    
    File.exists?("scripts/#{@n}.js").should == true
  end
  
  it 'should create init.js in display' do
    
    Entityjs::Comp.generate("display/#{@n}").should == 0
    
    File.exists?("scripts/display/#{@n}.js").should == true
  end
  
  it 'should create init.js and items' do
    
    Entityjs::Comp.generate("items/#{@n}.js").should == 0
    File.exists?("scripts/items/#{@n}.js").should == true
  end

end