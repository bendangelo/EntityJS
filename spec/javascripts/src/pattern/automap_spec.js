describe('automap', function(){
	
	var e;

	beforeEach(function(){
		e = re.e('automap');
	});

	it('automap', function(){
		
    is(e.automap(0, 0, 10));
    
    eq(e.automap(0, 0), 10)
    
    eq(e.lenX, 1)
    eq(e.lenY, 1)
    
	});
  
  it('within', function(){
    
    not(e.within(-1, 0))
    
    not(e.within(10, 2))
    
    e.automap(10, 2, 0);
    
    ok(e.within(10, 2))
    
  })
  
  it('should copy map by value', function(){
    
    var level = 
    [
    [1,2,3,4,5,6],
    [6,5,4,3,2,1]
    ];
    
    is(e.automap(level))
    eq(e.lenX, level[0].length)
    eq(e.lenY, level.length)
    
    eq(e.automap(0, 0), 1)
    eq(e.automap(0, 1), 6)
  })
  
  
  it('should copy map by ref', function(){
    
    var level = 
    [
    [1,2,3,4,5,6],
    [6,5,4,3,2,1]
    ];
    
    is(e.automap(level, true))
    eq(e.lenX, level[0].length)
    eq(e.lenY, level.length)
    
    eq(e.automap(0, 0), 1)
    eq(e.automap(0, 1), 6)
    
    eq(e.map, level)
  })
  
});
