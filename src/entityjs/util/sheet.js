/*
The sheet component converts a each frame of a sprite sheet into their own components.
*/
re.c('sheet')
.global({
	
	sheet:function(map, padX, padY, sizeX, sizeY){
		
		var frameWidth = sizeX || re.tile.sizeX;
		var frameHeight = sizeY || re.tile.sizeY;
		
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
			.extend({
				frame:{x:x, y:y},
				size:{x:frameWidth, y:frameHeight},
				bitmap:this.bitmap
			});
			
		}
		
		return this;
	}
	
})
.require('tile')
.extend({
	
	sheet:re.sheet
	
});

re.sheet = re.c('sheet').sheet;