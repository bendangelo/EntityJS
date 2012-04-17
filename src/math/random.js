/*
re.random() // 0 - 1
re.random(10) // 0 - 9
re.random(10, 30) // 10 - 30
re.random([1, 10, 40]) // 1 or 10 or 40

*/
re.random = function(max, min){
  var r = Math.random();
  if(re.is(max, 'array')){
    return max[r * max.length | 0];
  }
		switch(arguments.length){
			case 0:
			return r;
			case 1:
			return r * max;
			case 2:
			return r * (max - min + 1) + min;
  }
};

re.randomInt = function(){
  return re.random.apply(re.random, arguments) | 0;
};