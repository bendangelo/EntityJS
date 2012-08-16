/*
Similar to limit comp.
*/
re.clamp = function(value, min, max){
	if(value < min) return min;
	else if(re.is(max) && value > max) return max;
	return value;
};