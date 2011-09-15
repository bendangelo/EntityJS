/*
This example creates a tile based world from a multi-dimensional array.

Since tile-based games are popular some helper components have been
created. The tile components helps with moving tiles and getting tile
coordinates.

The query system also has a nice method called map which loops
through a two-dimensional array.
*/

re.constants = {
	//enter in tiles from 0-3
	// 0 is water
	// 1 is wood wall
	// 2 is stone wall
	// 3 is grass
	map:
	[
	[2, 2, 2, 2, 2, 3, 3, 2, 2, 2],
	[3, 3, 0, 0, 0, 3, 3, 3, 3, 0],
	[3, 3, 3, 3, 3, 3, 2, 2, 0, 0],
	[3, 3, 0, 3, 3, 3, 3, 3, 0, 0],
	[2, 1, 3, 1, 3, 3, 3, 3, 3, 3]
	],
	
	canvasId:'#canvas',
	tileSize:40,
	assets:'tiles.png'
}

re.ready(function(){
	
	re.sys.init(re.constants.canvasId, 30).start();
	
	//setup tile size
	re.tile.size.x = re.constants.tileSize;
	re.tile.size.y = re.constants.tileSize;
	
	re.load(re.constants.assets)
	.success(function(){
		
		//load world
		re.e('level')
		.load(re.constants.map);
		
	});
	
	
});

/*
The level component loads and handles all tiles in the game.
*/
re.c('level')
.define({
	
	//loads given tile map
	load:function(map){
		
		var totalTiles = map.length * map[0].length;
		
		//create tiles
		//second parameter defines how many entities to create. (default 1)
		//if count is higher than one it will return a query of all tiles
		this.tiles = re.e('sprite tile '+re.constants.assets, totalTiles)
		//returns entities as a two dimensional array
		//the first value is the width of the array
		.map(map[0].length, function(x, y){
			
			//remember to set the crop image size of tiles
			//or else nothing will appear
			this.frame.size = re.tile.size;
			
			this.setFrameId(map[y][x]);
			
			this.tile(x, y);
			
		});
		
	}
	
});