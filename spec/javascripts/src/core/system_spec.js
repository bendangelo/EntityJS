describe('system', function(){
    
    var s;
    
    beforeEach(function(){
        s = re.e('system').init('#game-canvas');
    });
    
    it('init', function(){
        is(re.e('system').init('#game-canvas').context);
    });
    
    it('clear', function(){
        is(s.start());
        
        spyOn(s.context, 'fillRect');
        
        is(s.clear('#FF0000'));
        called(s.context.fillRect);
        
        is(s.clear('rgb(200, 0, 0)'));
        called(s.context.fillRect);
        
        is(s.clear());
        
        is(s.stop());
    });
    
    it('loop', function(){
        var called = false;
        //setup custom loop
        s = re.e('system').init('#game-canvas')
        .loop(function(){
            called = true;
        }).start().stop();
        
        ok(called);
    });
    
});