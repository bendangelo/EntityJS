describe('hitmap', function(){
	
	var e;

	beforeEach(function(){
		e = re.e('hitmap');
	});

	it('checkHit', function(){
		
    //setup re.tile
    
    //check hit on blank map
    var k = e.checkHit(0, 0, 10, 10, 10, 10, 0, 0);
    
    is(k)
    
    //pos should be vel + pos
    eq(k.posX, 10)
    eq(k.posY, 10)
    
	});
  
  it('has automap', function(){
    
    e.automap(0,0,1);
    
  })
  
});
