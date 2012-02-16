require 'spec_helper'

describe 'test' do
  
  before(:all) do
    setup_mygame
    @n = rand(999999999999)
  end
  
  after(:all) do
    teardown_mygame
  end
  
  it 'should create rock' do
    Dir.pwd.should_not match /mygame\/mygame/
    Entityjs::Command.run('test', ["rock#{@n}"]).should == 0
    File.exists?("tests/rock#{@n}_test.js").should == true
  end
        
  it 'should create rock in items' do
    Entityjs::Command.run('test', ["items/rock#{@n}"]).should == 0
    File.exists?("tests/items/rock#{@n}_test.js").should == true
  end
  
  it 'should create test with tests' do
    Entityjs::Command.run('test', ["tess#{@n}", "first", "second", "third"]).should == 0
    
    File.exists?("tests/tess#{@n}_test.js").should == true
  end
  
end