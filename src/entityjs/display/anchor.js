/*
The anchor component contains helper methods for positioning entities relative to system size.
*/
re.c('anchor')
.extend({
	
	centerX:function(o){
		o = o || 0;
		this.posX = Math.floor(re.sys.sizeX * 0.5 - this.sizeX * 0.5 + o);
		
		return this;
	},
	
	centerY:function(o){
		o = o || 0;
		this.posY = Math.floor(re.sys.sizeY * 0.5 - this.sizeY * 0.5 + o);
		return this;
	},
	
	right:function(x){
		x = x || 0;
		this.posX = Math.floor(re.sys.sizeX - this.sizeX + x);
		return this;
	},
	
	left:function(x){
		x = x || 0;
		this.posX = Math.floor(x);
		return this;
	},
	
	top:function(y){
		y = y || 0;
		this.posY = Math.floor(y);
		return this;
	},
	
	bottom:function(y){
		y = y || 0;
		this.posY = Math.floor(re.sys.sizeY - this.sizeY + y);
		return this;
	}
	
})
.inherit({
	
	sizeX:0,
	sizeY:0,
	
	posX:0,
	posY:0
	
});