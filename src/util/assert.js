/*
Throws an exception when false. This is useful for development.

All asserts will be removed when compiled.
*/
re.assert = function(test, message){
	message = message || '';
	if(!test) throw "Assert Fail: "+message;
	re.log("Assert Pass: "+message);
};