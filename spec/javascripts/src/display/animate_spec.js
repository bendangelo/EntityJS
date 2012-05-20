describe('display/animate', function(){

	var e;

	beforeEach(function(){
		e = re.e('animate');
	});

	it('should animate', function(){
		is(e.animate());
	});

});