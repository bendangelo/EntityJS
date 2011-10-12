/*
The point component extends an entity that has a 2d position in space.
This can be used for 2d calculations or most commonly 2d sprite positioning.

*/

re.c('point')
.inherit({
	
	posX:0,
	posY:0
	
})
.extend({
	
	setPos:function(x, y){
		
		if(arguments.length == 1){
			if(x.y)
				this.posY = x.posY;
			
			if(x.x)
				this.posX = x.posX;
			
		} else {
		
			this.posX = x;
			this.posY = y;
			
		}
		
		return this;
	},
	
	setPosX:function(x){
		this.posX = x;
		return this;
	},
	
	setPosY:function(y){
		this.posY = y;
		return this;
	},
	
	distanceTo:function(x, y){
		if(arguments.length == 1){
			y = x.posY;
			x = x.posX;
		}
		var kx, ky;
		kx = x-this.posX>>31;
		ky = y-this.posY>>31;
		
		return Math.round(((xt-this.posX ^kx)-kx)+((yt-this.posY^ky)-ky));
	}
	
});