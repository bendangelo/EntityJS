/*
The random component implements two helper methods for calculating random numbers.

r = re.e('random');

r.random() // 0 - 1
r.random(10) // 0 - 9
r.random(10, 30) // 10 - 30

randomInt rounds numbers to whole
*/
re.c('random')
.define({
	
	random:function(max, min){
		switch(arguments.length){
			case 0:
			return Math.random();
			case 1:
			return Math.random() * max;
			case 2:
			return Math.random() * (max - min + 1) + min;
		}
	},
	
	randomInt:function(max, min){
		return Math.floor(this.random.apply(this, arguments));
	}
	
})
.run(function(){
	var b = re.e('random');
	
	re.random = b.random;
	re.randomInt = b.randomInt;
	
	b.dispose();
});