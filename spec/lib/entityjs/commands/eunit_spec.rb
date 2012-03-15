require 'spec_helper'

describe "Eunit" do
  
  it 'should compile unit test src' do
    name = Entityjs::Eunit.eunit_name
    
    Entityjs::Eunit.generate().should == 0
    
    File.file?(name).should == true
    
    contents = IO.read(name)
    
    contents.should match /factory/
    contents.should match /qunit/i
  end
  
end