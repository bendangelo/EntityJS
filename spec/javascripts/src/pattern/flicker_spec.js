describe('flicker', function(){
	
	var e;

	beforeEach(function(){
    
		e = re.e().attr({
      health:0,
      flick:function(v){
        this.health += v; 
      }
    })
    .comp('flicker');
    
	});

	it('addFlicker', function(){
		
    e.addFlicker('heal', 5, 200, [10])
    
    is(e.flicker_reels['heal'])
    
	});
  
  it('removeFlicker', function(){
    
    is(e.addFlicker('heal', 5, 200, [10]))
    
    is(e.flicker_reels['heal'])
    
    is(e.removeFlicker('heal'))
    
    eq(e.flicker_reels['heal'], null)
  })
  
  it('flicker', function(){
    
    //should take one second to finish
    e.addFlicker('heal', 1, 1, [5, 5])
    
    var called = false;
    var called2 = false;
    
    e.on('flicker:start', function(){
      called = true;
    })
    .on('flicker:finish', function(v){
      called2 = true;
      is(v, 'string')
    })
    
    e.flicker('heal')
    
    ok(e.flickering('heal'))
    
    ok(e.flickering())
    
    ok(called)
    
    //manually call update
    for(var i=60; i--;){
      e.flicker_update(re.sys.stepSize);
      if(i == 30){
        eq(e.health, 5);
      }
    }
    
    eq(e.health, 10)
      
    ok(called2)
  })
  
});
