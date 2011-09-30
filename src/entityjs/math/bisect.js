/*
The bisect component cuts an object into equal sections. It supplies helper functions 
for converting to a section and from a section. Useful for sprites and animation.
*/
re.c('bisect')
.define({

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
	
	toBi:function(xt, yt, wt){
		
		return xt + (yt * wt);
	}

});