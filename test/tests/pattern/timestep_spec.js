describe('timestep', function(){
	
	var e;

	beforeEach(function(){
		e = re.e('timestep');
	});

	it('should call twice', function(){
		
    e.stepSize = 100;
    
    var calls = 0;
    
    e.timestep(200, function(){
      calls++;
    })
    
    eq(calls, 2)
    
	});

});
