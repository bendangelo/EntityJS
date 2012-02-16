describe('system', function(){
    
    var s;
    
    it('init', function(){
      
        is(re.sys.context);
    });
    
    it('clear', function(){
      var s = re.sys;
        is(re.sys.start());
        
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
        var old = re.sys.system_loop;
        //setup custom loop
        re.sys
        .loop(function(){
            called = true;
        }).start().stop();
        
        re.sys.loop(old)
        
        ok(called);
    });
    
});