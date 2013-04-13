describe('util/clone', function(){

	it('should clone object', function(){
		var k = {ok:10, blah:[]}

		var b = re.clone(k);

		eq(b.ok, k.ok)
		eq(b.blah, k.blah)
	})

	it('should clone array', function(){
		var k = [1,2];

		var b = re.clone(k);

		eq(b, k)
	})

});