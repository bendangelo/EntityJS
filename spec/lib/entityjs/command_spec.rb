require 'spec_helper'

describe 'command' do
    
    before(:all) do
        setup_mygame
    end
    
    before(:all) do
        teardown_mygame
    end
    
    it 'should run new' do
      Entityjs::New.stub(:generate).and_return('100')
      Entityjs::Command.run('new', ['mygame']).should == '100'
    end
    
    it 'should run build' do
      Entityjs::Build.stub(:generate).and_return('build')
      Entityjs::Command.run('build').should == 'build'
    end
    
    it 'should run version' do
      Entityjs::Command.run('version').should == 0
    end
    
    it 'should run test' do
      Entityjs::Test.stub(:generate).and_return('test')
      Entityjs::Command.run('test', ['yep.js']).should == 'test'
    end
    
    it 'should run comp' do
      Entityjs::Comp.stub(:generate).and_return('comp')
      Entityjs::Command.run('comp', ['test.js']).should == 'comp'
    end
    
    it 'should run help' do
      Entityjs::Command.run('help').should == 0
    end
    
    describe 'outside entityjs dir' do
        before(:all) do
            teardown_mygame
        end
        
        ['comp', 'build', 'test'].each do |i|
            it "should #{i} throw error" do
                Entityjs::Command.run(i).should == 2
            end
        end
    end
    
end