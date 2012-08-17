/*
Similar to limit comp.
*/
re.clamp = function(value, min, max){
	if(value < min) return min;
	else if(max!=null && value > max) return max;
	return value;
};