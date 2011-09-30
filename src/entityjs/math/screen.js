/*
The screen component is used for scrolling or shaking all visible objects. 
It simply offsets pos values upon rendering.

This is useful for setting up a tile-based game.
*/
re.c('screen')
.require('size point')
.define({
	
	moveTo:function(x, y){
		if(arguments.length == 1){
			y = x.y;
			x = x.x;
		}
		
		this.pos.x = x - this.reg.x;
		this.pos.y = y - this.reg.y;
		
		return this;
	}
	
})
.init(function(){
	
	this.reg = {x:0, y:0};
	
	this.size = {x:9, y:9};
	
});

re.ready(function(){
	re.screen = re.e('screen');
});