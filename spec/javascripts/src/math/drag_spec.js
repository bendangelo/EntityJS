describe('drag', function(){
	
	var e;

	beforeEach(function(){
		e = re.e('drag');
	});

	it('drag', function(){
		
    var called, called2, called3;
    
    e.on('drag:start', function(){
      called = true;
    })
    .on('drag:update', function(){
      called2 = true;
    })
    .on('drag:finish', function(){
      called3 = true;
    })
    
    is(e.dragStart(0, 0));
    
    ok(e.dragging)
    ok(called)
    
    is(e.dragUpdate(10, 0));
    
    ok(called2)
    
    is(e.dragFinish());
    
    ok(called3)
    
	});
  
});
