describe('screen', function(){
	
	var e;

	beforeEach(function(){
		e = re.e('screen');
	});

	it('pos', function(){
		eq(e.pos(), e)
    
    eq(e.pos(10, 4), e)
    
    eq(e.posX, 10)
    eq(e.posY, 4)
    
    //set with object
    eq(e.pos({posX:2, posY:3}), e)
    
    eq(e.posX, 2)
    eq(e.posY, 3)
	});

	it('toScreenx', function(){
		is(e.toScreenX(10))
	});
  
	it('toScreenY', function(){
		is(e.toScreenY(10))
	});
  
});
