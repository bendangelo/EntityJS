describe('image', function(){
	
  var i;
  var image_comp;
  
  beforeEach(function(){
    image_comp = f('image')
    i = re.e(['image', image_comp.name]);
  })
  
	it('image', function(){
		is(i.image())
    
    //set
    is(i.image(image_comp.image))
    
    eq(i.image(), image_comp.image)
	});
  
  it('visible', function(){
    ok(i.visible())
    
    i._image = null;
    
    not(i.visible())
  })
  
  it('draw', function(){
    is(i.draw(re.loop().context))
  })
  
});
