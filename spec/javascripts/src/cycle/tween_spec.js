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
    
    tween.tween_update(re.sys.stepSize)
    
    eq(tween.x, 100);
    ok(called)
    ok(calledUpdate)
    ok(calledFinish)
  });
  
  it('should move object in 60ms', function(){
    tween.y = 0;
    tween.tween(2*re.sys.stepSize, {x:50, y:100});
    
    var step = re.sys.stepSize;
    
    tween.tween_update(step)
    
    eq(tween.x, 25);
    
    tween.tween_update(step);
    
    eq(tween.x, 50);
    eq(tween.y, 100);
  });
  
  it('should tween object with initial value', function(){
    
    tween.x = 50;
    //also accepts seconds
    tween.tween(re.sys.stepSize * 2, {x:100});
    
    tween.tween_update(re.sys.stepSize);
    
    eq(tween.x, 75);
    
    tween.tween_update(re.sys.stepSize);
    
    eq(tween.x, 100);
  });
  
  it('should tween object with negative initial value', function(){
    
    tween.x = 50;
    //also accepts seconds
    tween.tween(re.sys.stepSize * 2, {x:0});
    
    tween.tween_update(re.sys.stepSize);
    
    eq(tween.x, 25);
    
    tween.tween_update(re.sys.stepSize);
    
    eq(tween.x, 0);
  });
  
});