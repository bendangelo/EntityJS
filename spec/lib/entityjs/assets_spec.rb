require 'spec_helper'

describe 'Assets' do
  
  before(:each) do
    setup_mygame
    
    files = factory(:assets)
    
    @sounds_file = Entityjs::Config.sounds_folder+'/fold/secret1.mp3'
    files.push @sounds_file
    
    Dir.stub(:glob).and_return(files)
    IO.stub(:read).and_return('{"test":0, "array":[1,2,3]}')
  end
  
  after(:all) do
    teardown_mygame
  end
  
  it 'should return all images' do
    #TODO: fix up tests..
    r = Entityjs::Assets.search('images')
    
  end
  
  it 'should return all sounds' do
    
    r = Entityjs::Assets.search('sounds')
    
    r.should include(@sounds_file.gsub('assets/', ''))
    
  end
  
  it 'should return all assets' do
    r = Entityjs::Assets.search()

    r.should include(@sounds_file.gsub('assets/',''))
  end
  
end