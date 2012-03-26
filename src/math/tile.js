/*
The tile component adds tile positioning functions and helper functions for tile based games.

@usage

//set tile size
re.tile.sizeX = 40;
re.tile.sizeY = 40;

//convert mouse coordinates to a tile position..
var mouse = {x:10, y:234};

re.tile.toX(mouse.x) // 0
re.tile.toY(mouse.y) 

//create tile
var tile = re.e('tile sprite tiles.png')
.tile(2, 4);

tile.posX // 2 * re.tile.sizeX == 80
tile.posY // 4 * re.tile.sizeY == 160

//create a bunch of tiles from a map

var map = 
[
[1,2,4,5,0,3,4,5,6,7],
[1,2,4,5,0,3,4,5,6,7],
[1,2,4,5,0,3,4,5,6,7],
[1,2,4,5,0,3,4,5,6,7]
];

re.e('tile sprite tiles.png', map.length * map[0].length)
.tilemap(map.length[0].length,function(x, y){
  this.tile(x, y);
  this.frame(map[y][x]);
});

@warning moving to negative tiles will cause rounding issues.
Its recommended you avoid negative tile values

*/
re.tile = re.c('tile')
.statics({
    sizeX:40,
    sizeY:40,
    
    toX:function(x, size){
        size = size || this.sizeX;
        return this.toTileX(x, size) * size;
    },
    
    toY:function(y, size){
      size = size || this.sizeY;
        return this.toTileY(y, size) * size;
    },
    
    //converts the given coordinate to a tile position
    toTileX:function(x, size){
        size = size || this.sizeX;
        return (x - size * 0.5) / size + 0.5 | 0
    },
    
    toTileY:function(y, size){
        size = size || this.sizeY;
        return (y - size * 0.5) / size + 0.5 | 0
    }
    
})
.defaults({
    
    posX:0,
    posY:0,
    regX:0,
    regY:0
    
})
.defines({

    tile:function(x, y){
      if(re.is(x,'object')){
        //will mess up if regX is not top right corner
        y = x.y || re.tile.toTileY(x.posY);
        x = x.x || re.tile.toTileX(x.posX);
      }
      this.tileX(x);
      this.tileY(y);
      return this;
    },
    
    tileX:function(v){
      if(re.is(v)){
        this.posX = (v - this.regX) * this.sizeX + 0.5 | 0;
        return this;
      }
      
      return (this.posX - this.regX) / this.sizeX + 0.5 | 0;
    },
    
    tileY:function(v){
      if(re.is(v)){
        this.posY = (v - this.regY)* this.sizeY + 0.5 | 0;
        return this;
      }
      
      return (this.posY - this.regY) / this.sizeY + 0.5 | 0;
    }
    
})
.init(function(){
  this.sizeX = re.tile.sizeX;
  this.sizeY = re.tile.sizeY;
  
})