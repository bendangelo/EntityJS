/*
The bisect component cuts an object into equal sections. It supplies helper functions 
for converting to a section and from a section. Useful for sprites and animation.

The bisect is the width of an area.
The size is the size of each equally divided block inside the width.
For a sprite the bisect would be the total width of the image
and the size would be the size of each frame.

The bisect transforms two numbers, x and y positons, into a single bi number.

This works by increasing the bi value once the x position is past the width.
Note: width is called the bisect and the bi is the transformed x,y positions.



*/
re.c('bisect')
.statics({
	
	toX:function(bi, width, size){
		
		return this.toTileX(bi, width, size) * size;
	},
	
	toY:function(bi, width, sizeX, sizeY){
		
		return this.toTileY(bi, width, sizeX) * sizeY;
	},
	
	toTileX:function(bi, width, sizeX){
		
		return bi % (width / sizeX) | 0;
	},
	
	toTileY:function(bi, width, sizeX){
		return (bi * sizeX) / (width - 0.1) | 0;
	},
	
  /*
  Accepts Tile positions not normal X,Y
  */
	tileToBi:function(xt, yt, w, s){
		
		return (xt + (yt * (w / s)));
	}
	
})
.defines({

	
	biToX:function(bi){
		
		return re.bisect.toX(bi, this.bisect, this.sizeX);
	},
	
	biToY:function(bi){
		
		return re.bisect.toY(bi, this.bisect, this.sizeX, this.sizeY);
	},
	
	biToTileX:function(bi){
		
		return re.bisect.toTileX(bi, this.bisect, this.sizeX);
	},
	
	biToTileY:function(bi){
    //sizeY doesn't matter when dealing with bisects
		return re.bisect.toTileY(bi, this.bisect, this.sizeX);
	},
	
	tileToBi:function(xt, yt){
		return re.bisect.tileToBi(xt, yt, this.bisect, this.sizeX);
	}
	
})
.defaults({
	
	//full width
	bisect:1,
	
	sizeX:1,
	sizeY:1
	
});