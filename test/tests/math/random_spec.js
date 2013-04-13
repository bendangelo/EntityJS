describe('random', function(){
	
	it('random 0-1', function(){
		
    for(var i = 100; i--;){
      var n = re.random();
      ok(n >= 0)
      ok(n <= 1)
    }
    
	});

	it('random 0-3', function(){
		
    for(var i = 100; i--;){
      var n = re.random(3);
      ok(n >= 0)
      ok(n <= 3)
    }
    
	});
  
  it('should get one or the other', function(){
    
    var first = false;
    var second = false;
    
    for(var i = 100; i--;){
      var n = re.random([-10, 10]);
      if(n == 10) first = true;
      if(n == -10) second = true;
      ok(n == -10 || n == 10)
    }
    
    ok(first)
    ok(second)
    
  });
  
	it('random -10 to 10', function(){
		
    for(var i = 100; i--;){
      var n = re.random(-10, 10);
      ok(n >= -10)
      ok(n <= 10)
    }
    
	});

  it('random prop from object', function(){
    var obj = {ok:10, blah:2, t:3};

    var prop = re.random(obj);

    ok(prop == 'ok' || prop == 'blah' || prop == 't')
  })
  
});
