re.extend = function(){
	var out = {};
	for(var i in arguments){
		for(var b in arguments[i]){
			out[b] = arguments[i][b];
		}
	}
	return out;
};