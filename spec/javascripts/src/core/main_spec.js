describe('main', function(){
    
    var s;
    
    beforeEach(function(){
        s = re.main();
    });

    it('init', function(){
        is(s.context);
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
        var old = s.main_loop;
        //setup custom loop
        s
        .loop(function(){
            called = true;
        }).start().stop();
        
        s.loop(old)
        
        ok(called);
    });
    
});