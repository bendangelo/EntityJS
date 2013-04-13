describe('sheet', function(){
	
	it('create sheet', function(){
		
    is(re.sheet({
      rock:[1, 2],
      water:[0,2]
    }, 'accept.png', 2, 2), 'array')
    
    var e = re.e('rock');
    
    eq(e.sizeX, 2)
    eq(e.sizeY, 2)
    eq(e.frameX, 1)
    eq(e.frameY, 2)
    
    e = re.e('water');
    
    eq(e.sizeX, 2)
    eq(e.sizeY, 2)
    eq(e.frameX, 0)
    eq(e.frameY, 2)
	});

});
