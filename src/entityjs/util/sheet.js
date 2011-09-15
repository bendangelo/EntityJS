re.c('sheet')
.require('tile')
.define({
	
	sheet:function(map, padX, padY){
		
		var frameWidth = re.tile.size.x;
		var frameHeight = re.tile.size.y;
		
		if(padX){
			frameWidth += padX;	
		}
		
		if(padY){
			frameHeight += padY;	
		}
		
		//create new sprites for sheet
		
		//save frame positions from map
		var x;
		var y;
		
		for(var p in map){
			x = map[p][0] || 0;
			y = map[p][1] || 0;
			
			re.c(p)
			.require('sprite')
			.define({
				frame:{x:x, y:y, 
				size:{x:frameWidth, y:frameHeight}
				},
				sheet:this.image,
			});
			
		}
		
		return this;
	}
	
});