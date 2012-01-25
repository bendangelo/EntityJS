require 'spec_helper'

describe 'command' do
    
    before(:all) do
        setup_mygame
    end
    
    before(:all) do
        teardown_mygame
    end
    
    describe 'new' do
        it 'should run mygame' do
            Entityjs::Command.run(['new', 'mygame']).should == true
        end
        
        it 'should run mygame with components'
    end
    
    describe 'build' do
        it 'should run' do
            Entityjs::Command.run(['build']).should == true
        end
    
        it 'should run release1' do
            Entityjs::Command.run(['build', 'release1']).should == true
        end
    end
    
    describe 'version' do
        it 'should run' do
            Entityjs::Command.run(['version']).should == true
        end
        it 'should run short version' do
            Entityjs::Command.run(['v']).should == true
        end
    end
    
    describe 'refresh' do
        it 'should run refresh'do
            Entityjs::Command.run(['refresh']).should == true
        end
        it 'should run refresh short' do
            Entityjs::Command.run(['r']).should == true
        end
    end
    
    describe 'test' do
        it 'should not run' do
            Entityjs::Command.run(['test']).should == true
        end
        it 'should create init'
        
        it 'should create init in display'
    end
    
    describe 'comp' do
        it 'should create init.js'
        it 'should create init'
        it 'should not run'
        it 'should create init.js in display'
        it 'should create init.js and items'
    end
    
    describe 'help' do
        it 'should run help'
        it 'should run short help'
    end
    
    describe 'outside entityjs dir' do
        before(:all) do
            teardown_mygame
        end
        
        ['comp', 'build', 'refresh', 'test'].each do |i|
            it "should #{i} throw error" do
                Entityjs::Command.run([i]).should == false
            end
        end
    end
    
end