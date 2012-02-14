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
  
  it('should hit wall', function(){
    re.tile.sizeX = 25;
    re.tile.sizeY = 25;
    
    var posX = 0;
    var posY = 0;
    var velX = 40;
    var velY = 0;
    var bodX = 25;
    var bodY = 25;
    
    //setup hit block
    e.automap(1, 0, e.hitValue);
    
    var res = e.checkHit(posX, posY, velX, velY, bodX, bodY, 0, 0);
    
    ok(res.hitX);
    is(res.tarX)
    is(res.tarY)
    
  })
  
  it('has automap', function(){
    
    e.automap(0,0,1);
    
  })
  
});
