describe('point', function(){
	
	var e;

	beforeEach(function(){
		e = re.e('point');
	});

	it('should set pos with params', function(){
		
    is(e.pos(10, 4))
    
    eq(e.posX, 10)
    eq(e.posY, 4)
    
	});
  
  it('should set pos with object', function(){
    
    var obj = {x:10, y:45};
    
    is(e.pos(obj))
    
    eq(e.posX, obj.x)
    eq(e.posY, obj.y)
    
    
    obj = {posX:13, posY:25};
    
    is(e.pos(obj))
    
    eq(e.posX, obj.posX)
    eq(e.posY, obj.posY)
  })
  
  it('should be correct distance', function(){
    e.posX = 12;
    e.posY = 54;
    eq(e.distance(23,74)+0.5|0, 23)
  })
  
  it('should be correct distance with from', function(){
    
    e.posX = 12;
    e.posY = 54;
    
    var o = {x:23, y:74}
    
    eq(e.distance(o) +0.5 | 0, 23)
    
    
    o = {posX:23, posY:74}
    
    eq(e.distance(o)+0.5|0, 23)
  })
  
});
