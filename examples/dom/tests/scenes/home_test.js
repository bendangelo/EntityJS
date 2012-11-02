module('home');

test('enter home', function(){

	re.scene('home').enter();

	//check if one button exists
	eq(re("btn").length, 1);
});