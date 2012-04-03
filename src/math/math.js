re.math = re.c('math')
.statics({
  
  distance:function(x1, y1, x2, y2) {  
    var kx, ky;
    kx = x2 - x1;
    ky = y2 - y1;
    
    return Math.sqrt(kx*kx + ky*ky);
  },
  
  /*
  re.random() // 0 - 1
  re.random(10) // 0 - 9
  re.random(10, 30) // 10 - 30
  re.random([1, 10, 40]) // 1 or 10 or 40
  
  */
  random:function(max, min){
    if(re.is(max, 'array')){
    return max[Math.random() * max.length | 0];
  }
    var r = Math.random();
		switch(arguments.length){
			case 0:
			return r;
			case 1:
			return r * max;
			case 2:
			return r * (max - min + 1) + min;
    }
  }
  
});