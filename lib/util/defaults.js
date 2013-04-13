/*
Returns first value that is not null or undefined.

re.defaults(null, 0, 100); //0

*/
re.defaults = function(){
	for(var i in arguments){
		var k = arguments[i];
		if(k!=null){
			return k;
		}
	}
};