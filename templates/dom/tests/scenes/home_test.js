module('home');

test('enter home', function(){

	re.scene('home').enter();

	var ref;

	//check if entity exists
	is(ref = re('animate').first());

	//expects entity to have event listeners
	expectEvent(ref, 'keyup:enter');
	expectEvent(ref, 'keyup:q');
});