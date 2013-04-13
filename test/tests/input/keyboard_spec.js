describe('keyboard', function(){
	
	var e,
  keyboard;

	beforeEach(function(){
    //create system
    keyboard = re.s('keyboard').create();

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
    
    //manually call
    keyboard.event({type:type, keyCode:68})//d
    
    eq(called, 'd')
    eq(called2, null)
    
    keyboard.event({type:type, keyCode:82})//r
    
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
    
    //manually call
    keyboard.event({type:type, keyCode:68})//d
    
    eq(called, 'd')
    eq(called2, null)
    
    keyboard.event({type:type, keyCode:82})//r
    
    eq(called, 'r')
    eq(called2, 'r')
    
  });
  
});
