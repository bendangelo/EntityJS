describe('main', function(){
    
    var s;
    
    it('init', function(){
      
        is(re.main.context);
    });
    
    it('clear', function(){
      var s = re.main;
        is(re.main.start());
        
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
        var old = re.main.main_loop;
        //setup custom loop
        re.main
        .loop(function(){
            called = true;
        }).start().stop();
        
        re.main.loop(old)
        
        ok(called);
    });
    
});