/*
The tile component adds tile positioning functions and helper functions for tile based games.
*/
re.tile = re.c('tile')
.require('point size')
.static({
	size:{x:40, y:40},
	
	pointToX:function(x){
		return re.tile.pointToXt(x) * re.tile.size.x;
	},
	
	pointToY:function(y){
		return re.tile.pointToYt(y) * re.tile.size.y;
	},
	
	pointToXt:function(x){
		return Math.round((x-re.tile.size.x*0.5)/re.tile.size.x);
	},
	
	pointToYt:function(y){
		return Math.round((y-re.tile.size.y*0.5)/re.tile.size.y);
	}
})
.init(function(){
	this.size = re.tile.size;
	
})
.define({

	tileFromPoint:function(x, y){
		this.pos.x = re.tile.pointToX(x);
		this.pos.y = re.tile.pointToY(y);
	},
	
	tile:function(xt, yt){
		this.setXt(xt);
		this.setYt(yt);
		
		return this;
	},
	
	setXt:function(value){
		this.pos.x = Math.floor(value * this.size.x);
		
		return this;
	},
	
	getXt:function(){
		return Math.floor(this.pos.x / this.size.x);
	},
	
	setYt:function(value){
		
		this.pos.y = Math.floor(value * this.size.y);
		
		return this;
	},
	
	getYt:function(){
		
		return Math.floor(this.pos.y / this.size.y);	
	
	}
	
});