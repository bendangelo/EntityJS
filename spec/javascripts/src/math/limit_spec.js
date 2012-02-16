describe('limit', function(){
	
	var e;

	beforeEach(function(){
		e = re.e('limit');
	});

	it('should limit by range', function(){
		
    e.posX = 999;
    
    is(e.limit('posX', 0, 100))
    
    eq(e.posX, 100)
    
	});


	it('should limit by minimum', function(){
		
    e.posX = 999;
    
    is(e.limit('posX', 0))
    
    eq(e.posX, 999)
    
    e.posX = -1;
    
    is(e.limit('posX', 0))
    
    eq(e.posX, 0)
	});
  
});
