/*
The ticker component calculates time between steps for animation or special effects.
*/
re.c('ticker')
.inherit({
	time:0,
	minStep:0.05
})
.init(function(){
	this.lastTime = Date.now();
})
.define({

	tick:function(){
		var wall = Date.now();
		var delta = (wall - this.lastTime) / 1000;
		
		this.lastTime = wall;
		
		var timeDelta = Math.min(delta, this.minStep);
		this.time += timeDelta;
		
		return timeDelta;
	}
	
});