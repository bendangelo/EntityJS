/*
The ticker component calculates time between steps for animation or special effects.
*/
re.c('ticker')
.defaults({
	time:0,
	maxTick:0.05
})
.init(function(){
	this.lastTime = Date.now();
})
.extend({

	tick:function(){
		var wall = Date.now();
		var delta = (wall - this.lastTime) / 1000;
		
		this.lastTime = wall;
		
		var timeDelta = Math.min(delta, this.maxTick);
		
		this.time += timeDelta;
		
		return timeDelta;
	}
	
});