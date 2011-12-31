/*
The screen component is used for scrolling or shaking all visible objects. 
It simply offsets pos values upon rendering.

This is useful for setting up a tile-based game.
*/
re.c('screen')
.require('hittest')
.extend({
	
	setPos:function(x, y){
		if(arguments.length == 1){
			y = x.posY;
			x = x.posX;
		}
		
		this.posX = x - this.regX;
		this.posY = y - this.regY;
		
		return this;
	},
	
	toScreenX:function(x){
		return x + this.posX + this.offX;
	},
	
	toScreenY:function(y){
		return y + this.posY + this.offY;
	}
	
})
.defaults({
	
	posX:0,
	posY:0,
	
	regX:0,
	regY:0,
	
	sizeX:0,
	sizeY:0,
	
	offX:0,
	offY:0
	
});