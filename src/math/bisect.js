/*
The bisect component cuts an object into equal sections. It supplies helper functions 
for converting to a section and from a section. Useful for sprites and animation.
*/
re.bisect = re.c('bisect')
.global({
	
	biToX:function(bi, width, size){
		
		return this.biToXt(bi, width) * size;
	},
	
	biToY:function(bi, width, size){
		
		return this.biToYt(bi, width) * size;
	},
	
	biToXt:function(bi, width, size){
		
		return Math.floor(bi % (width / size) );
	},
	
	biToYt:function(bi, width, size){
		return Math.floor((bi * size) / (width - 0.1));
	},
	
	toBi:function(xt, yt, w, s){
		
		return (xt + (yt * (w / s))) / s;
	}
	
})
.extend({

	
	biToX:function(bi){
		
		return this.biToXt(bi, this.bisect) * this.sizeX;
	},
	
	biToY:function(bi){
		
		return this.biToYt(bi, this.bisect) * this.sizeY;
	},
	
	biToXt:function(bi){
		
		return Math.floor(bi % (this.bisect / this.sizeX) );
	},
	
	biToYt:function(bi){
		return Math.floor((bi * this.sizeY) / (this.bisect - 0.1));
	},
	
	toBi:function(xt, yt){
		
		return (xt + (yt * (this.bisect / this.sizeX))) / this.sizeX;
	}
	
})
.defaults({
	
	//full width
	bisect:1,
	
	sizeX:1,
	sizeY:1
	
});