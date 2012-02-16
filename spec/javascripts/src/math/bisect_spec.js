describe('bisect', function(){
	
	var e;

	beforeEach(function(){
		e = re.e('bisect');
    e.bisect = 160;
    e.sizeX = 60;
    e.sizeY = 60;
	});
  
  it('static biToX', function(){
		eq(re.bisect.biToX(1, 160, 60), 60)
	});
  
  it('static biToY', function(){
		eq(re.bisect.biToY(1, 160, 60), 0)
		
	});
  
  it('static biToTileX', function(){
		eq(re.bisect.biToTileX(1, 160, 60), 1)
		
	});
  
  it('static biToTileY', function(){
		eq(re.bisect.biToTileY(1, 160, 60), 0)
		
	});
  
  it('static tileToBi', function(){
    eq(e.tileToBi(1, 0), 1)
	});
  
  it('biToX', function(){
    eq(e.biToX(1), 60)
	});
  
  it('biToY', function(){
    eq(e.biToY(1), 0)
		
	});
  
  it('biToTileX', function(){
    eq(e.biToTileX(1), 1)
		
	});
  
  it('biToTileY', function(){
    eq(e.biToTileY(1), 0)
		
	});
  
  it('tiletoBi', function(){
    eq(e.tileToBi(1, 0), 1)
	});
  

});
