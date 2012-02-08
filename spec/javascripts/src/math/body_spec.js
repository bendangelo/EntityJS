describe('body', function(){
	
	var e;

	beforeEach(function(){
		e = re.e('body');
	});

	it('touches', function(){
		e.bodyX = 40;
    e.bodyY = 40;
    
    not(e.touches(41, 0, 40, 40))
    var o = {posY:0, posX:0, sizeX:40, sizeY:30};
    
    ok(e.touches(o))
	});

	it('touchesBody', function(){
		e.bodyX = 40;
    e.bodyY = 40;
    
    not(e.touchesBody(41, 0, 40, 40, 0, 0))
    
    var o = {posY:0, posX:0, bodyX:40, bodyY:30, padX:0, padY:0};
    
    ok(e.touchesBody(o))
	});

});
