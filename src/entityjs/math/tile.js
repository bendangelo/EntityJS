/*
The tile component adds tile positioning functions and helper functions for tile based games.
*/
re.tile = re.c('tile')
.global({
	sizeX:40,
	sizeY:40,
	
	roundX:function(x, size){
		if(arguments.length == 1){
			size = re.tile.sizeX;
		}
		return re.tile.roundTileX(x) * size;
	},
	
	roundY:function(y, size){
		if(arguments.length == 1){
			size = re.tile.sizeY;
		}
		return re.tile.roundTileY(y) * size;
	},
	
	roundTileX:function(x, size){
		if(arguments.length == 1){
			size = re.tile.sizeX;
		}
		return Math.round((x - size*0.5)/size);
	},
	
	roundTileY:function(y, size){
		if(arguments.length == 1){
			size = re.tile.sizeY;
		}
		return Math.round((y - size * 0.5)/size);
	}
	
})
.inherit({
	
	posX:0,
	posY:0
	
})
.init(function(){
	
	if(!this.sizeX)
	this.sizeX = re.tile.sizeX;
	
	if(!this.sizeY)
	this.sizeY = re.tile.sizeY;
	
})
.extend({

	setTileFromPoint:function(x, y){
		this.posX = re.tile.roundX(x);
		this.posY = re.tile.roundY(y);
		
		return this;
	},
	
	setTile:function(xt, yt){
		this.setTileX(xt);
		this.setTileY(yt);
		
		return this;
	},
	
	setTileX:function(value){
		this.posX = Math.floor(value * this.sizeX);
		
		return this;
	},
	
	getTileX:function(){
		return Math.floor(this.posX / this.sizeX);
	},
	
	setTileY:function(value){
		
		this.posY = Math.floor(value * this.sizeY);
		
		return this;
	},
	
	getTileY:function(){
		
		return Math.floor(this.posY / this.sizeY);
	}
	
});