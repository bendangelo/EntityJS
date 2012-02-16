require 'spec_helper'

describe 'version' do
    
    it 'should display valid version' do
        Entityjs::VERSION.should match /^(\d+\.)?(\d+\.)?(\*|\d+).*$/
    end
    
end