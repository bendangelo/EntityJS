require 'spec_helper'

describe "Release" do
  
  it 'should release' do
    name = Entityjs::Release.release_name
    
    Entityjs::Release.generate().should == 0
  end
  
end