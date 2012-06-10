/*
Clones the given object. This returns a shallow copy.
*/
re.clone = function(b){
	if(!re.is('object')) return b;
	if(re.is(b,'array')) return b.slice();
	var o = {};
	for(var i in b){
		o[i] = b[i];
	}
	return o;
};