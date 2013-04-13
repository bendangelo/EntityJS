describe('test', function(){
	
	it('create new game scene', function(){
		
    var called = false;
    var val1, val2;
    
    re.scene('game')
    .enter(function(t,c){
      called = true;
      
      val1 = t;
      val2 = c;
    });
    
    ok(re.scene.current == null)
    
    re.scene('game').enter(10, 'sd')
    
    eq(re.scene.current, 'game')
    
    ok(called)
    eq(val1, 10)
    eq(val2, 'sd')
    
	});
  
  it('should exit properly', function(){
    
    var called = false;
    var val1, val2;
    
    re.scene('bob')
    .exit(function(cal, s){
      called = true;
      val1 = cal;
      val2 = s
    })
    
    //exit current scene
    re.scene('bob').exit(10, 's')
    
    ok(called)
    eq(val1, 10)
    eq(val2, 's')
    
    //current scene
    eq(re.scene(), null)
    
  })
  
  it('should exit once', function(){
    
    var called = 0;
    
    re.scene('bob')
    .exit(function(){
      called++;
    }).enter();
    
    re.scene('blah').enter(10);
    
    eq(called, 1);
    
  });
  
});
