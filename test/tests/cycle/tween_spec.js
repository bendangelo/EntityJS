describe('cycle/tween', function(){
  
  var tween;
  
  beforeEach(function(){
    tween = re.e('tween');
    tween.x = 0;
    tween.y = 0;
  });
  
  it('should move object', function(){
    var called = false, calledUpdate = false, calledFinish = false;
    
    tween.on('tween:update', function(){
      calledUpdate = true;
    })
    
    tween.on('tween:finish', function(){
      calledFinish = true;
    })
    
    tween.on('tween:start', function(){
      called = true;
    })
    
    tween.tween(0, {x:100});
    
    for(var i=60; i--;)
    tween.tween_update(re.loop().stepSize)
    
    eq(tween.x, 100);
    ok(called)
    ok(calledUpdate)
    ok(calledFinish)
  });
  
  it('should move object in 60ms', function(){
    
    tween.comp('tile');
    
    tween.x = -10;
    tween.tween(1, {x:50, tileY:10});
    
    var step = re.loop().stepSize;
    
    tween.tween_time = tween.tween_t * 0.5;
    
    tween.tween_update(step)
    
    eq(tween.x, 21.62);
    
    for(var i=60; i--;)
    tween.tween_update(step);
    
    eq(tween.x, 50);
    eq(tween.tileY(), 10);
  });
  
});