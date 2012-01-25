require 'spec_helper'

describe 'Assets' do
  
  before(:each) do
    setup_mygame
    
    files = []
    
    files.push Entityjs::Config.instance.assets_folder+'/levels/bob.json'
    files.push Entityjs::Config.instance.assets_folder+'/levels/bob.xml'
    @data_file = Entityjs::Config.instance.assets_folder+'/blag/bob.json'
    files.push @data_file
    files.push Entityjs::Config.instance.images_folder+'/yep.png'
    files.push Entityjs::Config.instance.images_folder+'/bdd.png'
    files.push Entityjs::Config.instance.sounds_folder+'/bdd.mp3'
    @sounds_file = Entityjs::Config.instance.sounds_folder+'/fold/secret1.mp3'
    files.push @sounds_file
    
    Dir.stub(:'[]').and_return(files)
    
  end
  
  after(:all) do
    teardown_mygame
  end
  
  it 'should return all images' do
    
    r = Entityjs::Assets.search('images')
    r.each do |i|
      i.should match /images/
      i.should_not match /levels|sounds|assets/
      i.should match /^*\.(png|gif|jpg|jpeg)$/i
    end
    
  end
  
  it 'should return all sounds' do
    
    r = Entityjs::Assets.search('sounds')
    r.each do |i|
      i.should match /sounds/
      i.should_not match /levels|images|assets/
      i.should match /^*\.(mp3|aac|wav|ogg)$/i
    end
    
    r.should include(@sounds_file.gsub('assets/', ''))
    
  end
  
  it 'should return all datas' do
    
    r = Entityjs::Assets.search('*')
    r.each do |i|
      i.should match /levels|blag/
      i.should_not match /sounds|images|assets/
      i.should match /^*\.(json)$/i
    end
    
    r.should include(@data_file.gsub('assets/', ''))
  end
  
  it 'should generate sounds to js' do
    r = Entityjs::Assets.sounds_to_js
    r.should match /\[*\]/
    
  end
  
  it 'should generate images to js'
  
  it 'should generate datas to js'
  
  it 'should generate all to js'
  
end