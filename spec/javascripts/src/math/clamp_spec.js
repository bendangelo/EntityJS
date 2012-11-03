describe('clamp', function(){
	
	var e;

	beforeEach(function(){
		e = re.e('clamp');
	});

	it('should clamp by range', function(){
		
	    e.posX = 999;
	    
	    is(e.clamp('posX', 0, 100))
	    
	    eq(e.posX, 100)
    
	});

	it('should clamp by range, global method', function(){
		
    e.posX = 999;
    
    e.posX = re.clamp(e.posX, 0, 100);
    
    eq(e.posX, 100);
    
	});

	it('should clamp by minimum', function(){
		
    e.posX = 999;
    
    is(e.clamp('posX', 0))
    
    eq(e.posX, 999)
    
    e.posX = -1;
    
    is(e.clamp('posX', 0))
    
    eq(e.posX, 0)
	});
  
});
