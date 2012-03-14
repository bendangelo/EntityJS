require 'spec_helper'

describe 'Assets' do
  
  before(:each) do
    setup_mygame
    
    files = factory(:assets)
    
    @data_file = Entityjs::Config.assets_folder+'/blag/bob.json'
    files.push @data_file
    
    @sounds_file = Entityjs::Config.sounds_folder+'/fold/secret1.mp3'
    files.push @sounds_file
    
    Dir.stub(:'[]').and_return(files)
    IO.stub(:read).and_return('{"test":0, "array":[1,2,3]}')
  end
  
  after(:all) do
    teardown_mygame
  end
  
  it 'should return all images' do
    
    r = Entityjs::Assets.search('images')
    r.each do |i|
      i.should match /images/
      i.should_not match /levels|sounds|assets/
      i.should match /^.*\.(png|gif|jpg|jpeg)$/i
    end
    
  end
  
  it 'should return all sounds' do
    
    r = Entityjs::Assets.search('sounds')
    r.each do |i|
      i.should match /sounds/
      i.should_not match /levels|images|assets/
      i.should match /^.*\.(mp3|aac|wav|ogg)$/i
    end
    
    r.should include(@sounds_file.gsub('assets/', ''))
    
  end
  
  it 'should return all datas' do
    
    r = Entityjs::Assets.search('*')
    r.each do |i|
      i.should match /levels|blag/
      i.should_not match /sounds|images|assets/
      i.should match /^.*\.(#{Entityjs::Assets.valid_datas.join('|')})$/i
    end
    
    r.should include(@data_file.gsub('assets/', ''))
  end
  
  it 'should generate sounds to js' do
    r = Entityjs::Assets.sounds_to_js
    r.should match /\[.*\]/
    
  end
  
  it 'should generate images to js' do
    r = Entityjs::Assets.images_to_js
    r.should match /\[.*\]/
    
  end
  
  it 'should generate datas to js' do
    r = Entityjs::Assets.datas_to_js
    r.should match /re\.e\('/
    
  end
  
  it 'should generate to js' do
    r = Entityjs::Assets.to_js
    r.should match /re\.assets/
    
  end
  
end