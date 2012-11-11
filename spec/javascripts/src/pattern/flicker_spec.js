describe('flicker', function(){
	
	var e;

	beforeEach(function(){
    
		e = re.e().set({
      health:0,
      flick:function(v){
        this.health += v; 
      }
    })
    .comp('flicker');
    
	});
  
  it('flicker', function(){
    
    //should take 4 seconds to finis
    var time = 4;
    
    var called = false;
    var called2 = false;
    var called3 = false;
    
    e.on('flicker:start', function(){
      called = true;
    })
    .on('flicker:finish', function(v){
      called2 = true;
      is(v, 'string')
    })
    .on('flicker:update', function(f, i, array, loop){
      is(f)
      is(i)
      is(array)
      is(loop)
      called3 = true;
    })
    
    e.flicker(time, [5, 5, 5, 5], 1, 'heal')
    
    ok(e.flickering('heal'))
    
    ok(e.flickering())
    
    ok(called)
    
    //manually call update
    
    for(var i=0; i<60 * time; i++){
      e.flicker_update(re.loop().stepSize);
    }
    
    eq(e.health, 20)
      
    ok(called2)
    ok(called3)
  })
  
  it('should flicker correctly', function(){
    
    e.flicker(1, [5]);
    

    for(var i=0; i<3; i++){
      e.flicker_update(e.stepSize * 0.5);

    }
      eq(e.health, 5);

  })
  
});
