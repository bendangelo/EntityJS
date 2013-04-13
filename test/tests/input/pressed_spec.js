describe('pressed', function(){

	it('single pressed', function(){
		
    not(re.pressed('d'))
    
    re.pressed.d['d'] = true;
    
    ok(re.pressed('d'))
        
    re.pressed.d['d'] = false;
 
	});

	it('multi pressed', function(){
		var a = ['d', 'w']
   
    not(re.pressed(a))
    
    re.pressed.d['d'] = true;
    
    ok(re.pressed(a))
    
    re.pressed.d['d'] = false;
    re.pressed.d['w'] = true;
    ok(re.pressed(a))
    
    re.pressed.d['w'] = false;
	});
  
});
