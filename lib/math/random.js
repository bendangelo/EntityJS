/*
re.random() // 0 - 1 floats
re.random(10) // 0 - 9 integer
re.random(10, 30) // 10 - 30 integer
re.random([1, 10, 40]) // 1 or 10 or 40
re.random({ok:10, b:10, c:1}) //ok or b or c

*/
re.random = function(max, min){
  var r = Math.random();
  if(re.is(max, 'array')){
    return max[r * max.length | 0];
  } else if(re.is(max, 'object')){

		var result;
		for (var prop in max){
			if (Math.random() < 1/++r || !re.is(result)){
				result = prop;
			}
		}

    return result;
  }
		switch(arguments.length){
			case 0:
			return r;
			case 1:
			return r * max;
			case 2:
			return r * (max - min) + min;
  }
};

re.randomInt = function(){
	return re.random.apply(this, arguments)|0;
};