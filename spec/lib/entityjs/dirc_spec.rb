require 'spec_helper'

describe 'dirc' do
  
  before(:all) do
    setup_mygame
  end
  
  after(:all) do
    teardown_mygame
  end
  
  it 'should be game dir' do
    Entityjs::Dirc.game?.should == true
  end
  
  it 'should not be game dir' do
    Dir.chdir(Dir.pwd+'/..')
    Entityjs::Dirc.game?.should == false
  end
  
  it 'should return script urls' do
    Dir.stub(:'[]').and_return(['asdfsdf/scripts/asdf.js', 'sfhs/scripts/sdf.js', 'asdf/scripts/sdf.json', 'asdf/scripts/sdf.tmx'])
    
    scripts = Entityjs::Dirc.find_scripts_url
    scripts.should be_instance_of Array
    
    scripts.last.should match /\.tmx/
    scripts[-2].should match /\.json/
  end
  
  it 'should ignore and order game scripts' do
    Dir.stub(:'[]').and_return(['asdfsdf/scripts/second.js', 'sfhs/scripts/first.js', 
      'sdf/scripts/kill.js','sdf/scripts/kill2.js'])
    
    out = Entityjs::Dirc.find_scripts_url(['kill'], ['first'])
    
    out.first.should match /first/
    out.each do |i|
      i.should_not match /kill|kill2/
    end
    
  end
  
  it 'should return entity src urls' do
    Entityjs::Dirc.stub(:find_entity_src).and_return(['asdfsdf/src/asdf.js', 'sfhs/src/sdf.js'])
    
    u = Entityjs::Dirc.find_entity_src_url
    
    u.size.should == 2
    
  end
  
  it 'should be alpha ordered' do
    s = Entityjs::Dirc.find_entity_src
    
    s[1].should_not match /socket\.js/
    
  end
  
  it 'should ignore entity scripts' do
    Dir.stub(:'[]').and_return(['asdfsdf/src/first.js', 'sfhs/src/ignore.js', 'sdfds/src/ignore2.js'])
    
    out = Entityjs::Dirc.find_entity_src_url(['ignore', 'ignore2'])
    
    out.each do |i|
      i.should_not match /ignore|ignore2/
    end
  end
  
  it 'should return tests' do
    Dir.stub(:'[]').and_return(['C:/asdfsdf/tests/asdf.js', 'C:/sfhs/tests/sdf.js'])
    
    Entityjs::Dirc.find_tests_url.first.should_not match /C:/
    
  end
  
  it 'should ignore tests' do
    Dir.stub(:'[]').and_return(['C:/asdfsdf/tests/asdf.js', 'C:/sfhs/tests/sdf.js'])
    
    Entityjs::Dirc.find_tests_url(['asdf']).each do |i|
      i.should_not match(/asdf/)
    end
    
  end
  
end