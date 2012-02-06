describe('sprite', function(){
	
	var e;

	beforeEach(function(){
		e = re.e('sprite '+f('image').name);
	});

	it('fra', function(){
		eq(e.fra(), 0)
    
    eq(e.fra(0), e)
    
    eq(e.fraX, 0)
    eq(e.fraY, 0)
	});
  
  it('draw', function(){
    
    is(e.draw(re.sys.context))
    
  });
  
});
