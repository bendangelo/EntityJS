describe('tile', function(){
	
	var e;

	beforeEach(function(){
    re.tile.sizeX = 40;
    re.tile.sizeY = 40;
    
		e = re.e('tile');
	});

  
  it('toPos', function(){
    var e = re.tile.toPos(88, 40);
    
    eq(e.posX, 80);
    eq(e.posY, 40);
  })
  
	it('toPosX', function(){
		
    eq(re.tile.toPosX(88, 40), 80);
    
    re.tile.sizeX = 40;
    eq(re.tile.toPosX(88), 80);
    
	});

  it('toPosY', function(){
    
    eq(re.tile.toPosY(88, 40), 80);
    
    re.tile.sizeY = 40;
    eq(re.tile.toPosY(88), 80);
    
  });
  
  it('toTile', function(){
    var e = re.tile.toTile(88, 40);
    
    eq(e.tileX, 2);
    eq(e.tileY, 1);
  })
  
  it('toTileX', function(){
    
    eq(re.tile.toTileX(88), 2);
    
    re.tile.sizeX = 40;
    eq(re.tile.toTileX(88), 2);
  })
  
  it('toTileY', function(){
    
    eq(re.tile.toTileY(88, 40), 2);
    
    re.tile.sizeY = 40;
    eq(re.tile.toTileY(88), 2);
  })
  
  it('tile', function(){
    e.sizeX = 40;
    e.sizeY = 40;
    
    is(e.tile(1, 1))
    
    eq(e.posX, 40)
    eq(e.posY, 40)
    
    
    is(e.tile({x:2, y:1}))
    
    eq(e.posX, 80)
    eq(e.posY, 40)
    
    is(e.tile({posX:2 * e.sizeX, posY:2 * e.sizeY}))
    
    eq(e.posX, 80)
    eq(e.posY, 80)
  })
  
  it('tileX', function(){
    is(e.tileX(2))
    eq(e.tileX(), 2)
  })
  
  it('tileY', function(){
    is(e.tileY(2))
    eq(e.tileY(), 2)
    
  })
  
});
