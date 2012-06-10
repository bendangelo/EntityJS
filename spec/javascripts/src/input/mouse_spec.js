describe('mouse', function(){
    
    var e;

    beforeEach(function(){
        e = re.e('mouse');
    });

    it('mousedown', function(){
      var type = 'mousedown'
      var called, called2;
      
      e.on(type, function(x,y, e){
        called = true
        is(x)
        is(y)
        is(e)
      });
      
      e.on(type+':middle', function(m, e){
        called2 = true
        is(m)
      })
      
      re.mouse.event({type:type, offsetX:0, offsetY:0}, 'middle')
      
      ok(called2)
      ok(called)
    });

  it('mouseup', function(){
      var type = 'mouseup'
      var called, called2;
      
      e.on(type, function(x,y, e){
        called = true
        is(x)
        is(y)
        is(e)
      });
      
      e.on(type+':middle', function(m, e){
        called2 = true
        is(m)
      })
      
      re.mouse.event({type:type, offsetX:0, offsetY:0}, 'middle')
      
      ok(called2)
      ok(called)
    
  });
  
  it('mousemove', function(){
    
      var type = 'mousemove'
      var called;
      
      e.on(type, function(x,y, e){
        called = true
        is(x)
        is(y)
        is(e)
      });
      
      re.mouse.event({type:type, offsetX:0, offsetY:0})
      
      ok(called)
  });
  
  it('click', function(){
    
      var type = 'click'
      var called;
      
      e.on(type, function(x,y, e){
        called = true
        is(e)
        is(x)
        is(y)
      });
      
      re.mouse.event({type:type, offsetX:50, offsetY:100})
      
      ok(called)
  })
  
  it('dblclick', function(){
    
      var type = 'dblclick'
      var called;
      
      e.on(type, function(x,y, e){
        called = true
        is(x)
        is(y)
        is(e)
      });
      
      re.mouse.event({type:type, offsetX:0, offsetY:0})
      
      ok(called)
  })
  
  it('contextmenu', function(){
    
      var type = 'contextmenu'
      var called;
      
      e.on(type, function(x,y, e){
        called = true
        is(x)
        is(y)
        is(e)
      });
      
      re.mouse.event({type:type, offsetX:0, offsetY:0})
      
      ok(called)
  })

});
