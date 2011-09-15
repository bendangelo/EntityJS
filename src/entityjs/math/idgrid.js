/*
The id grid component supplies functions for converting ids to coordinates 
and coordinates to ids. This is useful for spritesheets where an id is given
instead of x,y coordinates.
*/
re.c('idgrid')
.define({

	idToX:function(id, width, size){
		
		return this.idToXt(id, width) * size;
	},
	
	idToY:function(id, width, size){
		
		return this.idToYt(id, width) * size;
	},
	
	idToXt:function(id, width, size){
		
		return Math.floor(id % (width / size) );
	},
	
	idToYt:function(id, width, size){
		// + 0.1 will make the width bigger if equal value
		return Math.floor((id * size) / (width + 0.1));
	},
	
	toId:function(xt, yt, wt){
		
		return xt + (yt * wt);
	}

});