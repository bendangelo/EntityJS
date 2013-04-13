describe('cycle/wait', function(){
  
  var wait;
  
  beforeEach(function(){
    wait = re.e('wait');
  });
  
  it('should wait', function(){
    
    var called= false;
    
    runs(function(){
      
      is(wait.wait(function(){
        called = true;
        console.log('ran')
      }, 100));
      console.log('hey')
    });
    
    waits(101);
    
    runs(function(){
      ok(called)
      console.log('last')
    });
    
  });
  
});