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
  
	it('random -10 to 10', function(){
		
    for(var i = 100; i--;){
      var n = re.random(-10, 10);
      ok(n >= -10)
      ok(n <= 10)
    }
    
	});
  
});
