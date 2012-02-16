describe('test', function(){
	
	var e;

	beforeEach(function(){
		e = re.e('keyboard');
	});

	it('keydown listen', function(){
    var type = 'keydown';
    var called, called2;
    
    e.on(type, function(key, e){
      is(e)
      called = key;
    })
    
    e.on(type+':r', function(key, e){
      is(e)
      called2 = key
    });
    
    ok(re.c('keyboard').body, document.activeElement)
    
    //manually call
    re.c('keyboard').event({type:type, keyCode:68})//d
    
    eq(called, 'd')
    eq(called2, null)
    
    re.c('keyboard').event({type:type, keyCode:82})//r
    
    eq(called, 'r')
    eq(called2, 'r')
    
	});
  
  it('keyup listen', function(){
    var type = 'keyup';
    var called, called2;
    
    e.on(type, function(key, e){
      is(e)
      called = key;
    })
    
    e.on(type+':r', function(key, e){
      is(e)
      called2 = key
    });
    
    ok(re.c('keyboard').body, document.activeElement)
    
    //manually call
    re.c('keyboard').event({type:type, keyCode:68})//d
    
    eq(called, 'd')
    eq(called2, null)
    
    re.c('keyboard').event({type:type, keyCode:82})//r
    
    eq(called, 'r')
    eq(called2, 'r')
    
  });
  
});
