describe('physics', function(){
    
    var e;

    beforeEach(function(){
        e = re.e('physics');
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
    });

    it('force', function(){
        
    });
    
    it('forceVel', function(){
        eq(e.forceVel(5, 0, 0.5), 10)
    });
    
    it('forceGra', function(){
        
    });
    
    it('forceRes', function(){
        
    });
    
    it('aftermath', function(){
        
    });
    
    it('update', function(){
        
    });
});
