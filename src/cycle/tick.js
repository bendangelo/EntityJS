/*
The tick component is a stop watch cyclier. It will return the milliseconds in time
between tick() calls.

var tick = re.e('tick');
//wait 200 milliseconds
tick.tick(); //200
//wait 10 milliseconds
tick.tick(); //10
*/
re.c('tick')
.init(function(){
	this.lastTime = Date.now();
})
.defines({

	tick:function(){
		var wall = Date.now();
		var last = this.lastTime;
		this.lastTime = wall;
    
		return wall - last;
	}
	
});