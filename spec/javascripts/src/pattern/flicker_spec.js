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
    
    //should take 4 seconds to finis
    var time = 4;
    e.addFlicker('heal', 1, time, [5, 5, 5, 5])
    
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
    
    for(var i=0; i<60 * time; i++){
      if(i == 37){
        eq(e.health, 5);
      } else if(i==37+37){
        eq(e.health, 10);
      }
      e.flicker_update(re.sys.stepSize);
    }
    
    eq(e.health, 20)
      
    ok(called2)
  })
  
  it('should flicker correctly', function(){
    
    e.flicker('heal', 1, 1, [5]);
    
    eq(e.health, 5)
    
    for(var i=60;i--;){
      e.flicker_update(re.sys.stepSize);
      eq(e.health, 5);
    }
    
  })
  
});
