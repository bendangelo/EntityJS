require 'spec_helper'

describe "Release" do
  
  it 'should release' do
    name = Entityjs::Release.release_name
    
    Entityjs::Release.generate().should == 0
    
    File.file?(name).should == true
  end
  
end