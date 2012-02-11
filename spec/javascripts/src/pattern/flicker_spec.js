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
    
    e.addFlicker('heal', 2, 100, [5, 5])
    
    var called = false;
    var called2 = false;
    
    e.on('flicker:start', function(){
      called = true;
    })
    .on('flicker:end', function(v){
      called2 = true;
      is(v, 'string')
    })
    
    e.flicker('heal')
    
    ok(e.flickering('heal'))
    
    ok(e.flickering())
    
    ok(called)
    
    //manually call update
    e.flicker_update(0.9)
    
    eq(e.health, 20)
      
    ok(called2)
  })
  
});
