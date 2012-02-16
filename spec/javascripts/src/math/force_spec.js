describe('force', function(){
    
    var e;

    beforeEach(function(){
        e = re.e('force');
    });

    it('isIdle', function(){
        ok(e.isIdle())
        
        e.velY = 0;
        e.accX = 0;
        e.accY = 0;
        e.velX = 1;
        not(e.isIdle())
        
        e.velY = 0;
        e.accX = 0;
        e.accY = 1;
        e.velX = 0;
        not(e.isIdle())
        
        e.velY = 0;
        e.accX = 1;
        e.accY = 0;
        e.velX = 0;
        not(e.isIdle())
        
        
        e.velY = 1;
        e.accX = 0;
        e.accY = 0;
        e.velX = 0;
        not(e.isIdle())
        
        
        e.velY = 0;
        e.accX = 0;
        e.accY = 0;
        e.velX = 0;
        ok(e.isIdle())
        
        //offset
        e.velY = 2;
        ok(e.isIdle(2))
    });

    it('force', function(){
      for(var i =10; i--;)
        eq(e.force(10, i, 0.5, i, 2), ((10 + i) * 0.5 +i * 2))
    });
    
    it('forceVel', function(){
      for(var i =10; i--;)
        eq(e.forceVel(5, i, 0.5), (5+i) * 0.5)
    });
    
    it('forceGra', function(){
      for(var i = 10; i--;)
        eq(e.forceGra(i + 10, i), (i+10)*i)
    });
    
    it('forceRes', function(){
        for(var i =50; i-=5;)
          eq(e.forceRes(i, 3), i * -3)
    });
    
    it('update being called', function(){
      
      var called = false;
      
      e.on('aftermath', function(){
        called = true;
      })
      
      e.trigger('update')
      ok(called)
    })
    
    it('aftermath', function(){
      var called = false;
      
      e.on('aftermath', function(){
        called = true;
      })
      
        is(e.aftermath(10, 10, false, false))
        
        eq(e.posX, 10)
        eq(e.posY, 10)
        
        ok(called)
        
        e.aftermath(15, 15, true, true)
        
        not(e.velX == 15)
        not(e.velY == 15)
    });
    
    it('should update with hitmap', function(){
        
      var called = false;
      
      var hitmap = {checkHit:function(){
        called = true
        return true;
        }};
        
      e.hitmap = hitmap;
      
      e.velX = 1;
      e.velY = 1;
      
      e.force_update();
      
      not(e.posX == 0)
      not(e.posY == 0)
      ok(called)
      
    });
    
    it('should update with no hitmap', function(){
     
      e.hitmap = null;
      
      e.force_update();
      
      eq(e.posX, e.posX + e.velX)
      eq(e.posY, e.posY + e.velY)
       
      
    })
});
