describe('mouse', function(){
    
    var e;

    beforeEach(function(){
        e = re.e('mouse');
    });

    it('mousedown', function(){
      var type = 'mousedown'
      var called, called2;
      
      e.on(type, function(m, e){
        called = true
        is(m)
        is(m.screenX)
        is(m.screenY)
        is(m.posX)
        is(m.posY)
      });
      
      e.on(type+':middle', function(m, e){
        called2 = true
        is(m)
      })
      
      re.c('mouse').event({type:type, offsetX:0, offsetY:0}, 'middle')
      
      ok(called2)
      ok(called)
    });

  it('mouseup', function(){
      var type = 'mouseup'
      var called, called2;
      
      e.on(type, function(m, e){
        called = true
        is(m)
        is(m.screenX)
        is(m.screenY)
        is(m.posX)
        is(m.posY)
      });
      
      e.on(type+':middle', function(m, e){
        called2 = true
        is(m)
      })
      
      re.c('mouse').event({type:type, offsetX:0, offsetY:0}, 'middle')
      
      ok(called2)
      ok(called)
    
  });
  
  it('mousemove', function(){
    
      var type = 'mousemove'
      var called;
      
      e.on(type, function(m, e){
        called = true
        is(m)
        is(m.screenX)
        is(m.screenY)
        is(m.posX)
        is(m.posY)
      });
      
      re.c('mouse').event({type:type, offsetX:0, offsetY:0})
      
      ok(called)
  });
  
  it('click', function(){
    
      var type = 'click'
      var called;
      
      e.on(type, function(m, e){
        called = true
        is(m)
        is(m.screenX)
        is(m.screenY)
        is(m.posX)
        is(m.posY)
      });
      
      re.c('mouse').event({type:type, offsetX:0, offsetY:0})
      
      ok(called)
  })
  
  it('dblclick', function(){
    
      var type = 'dblclick'
      var called;
      
      e.on(type, function(m, e){
        called = true
        is(m)
        is(m.screenX)
        is(m.screenY)
        is(m.posX)
        is(m.posY)
      });
      
      re.c('mouse').event({type:type, offsetX:0, offsetY:0})
      
      ok(called)
  })
  
  it('contextmenu', function(){
    
      var type = 'contextmenu'
      var called;
      
      e.on(type, function(m, e){
        called = true
        is(m)
        is(m.screenX)
        is(m.screenY)
        is(m.posX)
        is(m.posY)
      });
      
      re.c('mouse').event({type:type, offsetX:0, offsetY:0})
      
      ok(called)
  })
});
