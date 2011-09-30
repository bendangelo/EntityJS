/*
The tile component adds tile positioning functions and helper functions for tile based games.
*/
re.tile = re.c('tile')
.require('point')
.global({
	size:{x:40, y:40},
	
	roundX:function(x, size){
		if(arguments.length == 1){
			size = re.tile.size.x;
		}
		return re.tile.pointToXt(x) * size;
	},
	
	roundY:function(y, size){
		if(arguments.length == 1){
			size = re.tile.size.y;
		}
		return re.tile.pointToYt(y) * size;
	},
	
	xToXt:function(x, size){
		if(arguments.length == 1){
			size = re.tile.size.x;
		}
		return Math.round((x-size*0.5)/size);
	},
	
	yToYt:function(y, size){
		if(arguments.length == 1){
			size = re.tile.size.y;
		}
		return Math.round((y-size*0.5)/size);
	}
	
})
.init(function(){
	this.size = re.tile.size;
	
})
.define({

	tileFromPoint:function(x, y){
		this.pos.x = re.tile.roundX(x);
		this.pos.y = re.tile.roundY(y);
		
		return this;
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