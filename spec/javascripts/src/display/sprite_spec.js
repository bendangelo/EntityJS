describe('sprite', function(){
	
	var e;

	beforeEach(function(){
		e = re.e('sprite '+f('image').name);
	});

	it('frame', function(){
		eq(e.frame(), 0)
    
    eq(e.frame(0), e)
    
    eq(e.frameX, 0)
    eq(e.frameY, 0)
	});
  
  it('draw', function(){
    
    is(e.draw(re.sys.context))
    
  });
  
});
