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
re.bisect = re.c('bisect')
.statics({
	
	biToX:function(bi, width, size){
		
		return this.biToTileX(bi, width, size) * size;
	},
	
	biToY:function(bi, width, size){
		
		return this.biToTileY(bi, width, size) * size;
	},
	
	biToTileX:function(bi, width, size){
		
		return bi % (width / size) | 0;
	},
	
	biToTileY:function(bi, width, size){
		return (bi * size) / (width - 0.1) | 0;
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
		
		return re.bisect.biToX(bi, this.bisect, this.sizeX);
	},
	
	biToY:function(bi){
		
		return re.bisect.biToY(bi, this.bisect, this.sizeY);
	},
	
	biToTileX:function(bi){
		
		return re.bisect.biToTileX(bi, this.bisect, this.sizeX);
	},
	
	biToTileY:function(bi){
		return re.bisect.biToTileY(bi, this.bisect, this.sizeY);
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