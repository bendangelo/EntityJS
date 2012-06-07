require 'spec_helper'

describe 'Page' do
  
  before do
    setup_mygame
  end
  
  after(:all) do
    teardown_mygame
  end
  
  it 'should render play' do
    html = Entityjs::Page.render_play_page
    
    html.should be_instance_of String
  end
  
  it 'should render test' do
    
    test = Entityjs::Page.render_test_page
    
    test.should be_instance_of String
  end
  
  it 'should render entityjs src' do
    src = Entityjs::Page.render_entityjs_src('core/re.js')
    
    src.should be_instance_of String
  end
  
  it 'should render eunit' do
    src = Entityjs::Page.render_eunit('qunit.js')
    
    src.should be_instance_of String
  end
  
  it 'should be script' do
    js = 'var test = 10;'
    Entityjs::Compile.stub(:script_to_js).and_return(js)
    
    script = Entityjs::Page.render_script('blah.js')
    
    script.should == js
  end
  
  it 'should render coffee script' do
    coffee = 'square = (x) -> x * x'
    
    #causes v8 to crash
    #IO.stub(:read).and_return(coffee)
    Entityjs::Compile.stub(:read_contents).and_return(coffee)
    
    js = Entityjs::Page.render_script('blah.coffee')
    
    js.should == "var square;\n\nsquare = function(x) {\n  return x * x;\n};\n"
  end
  
end