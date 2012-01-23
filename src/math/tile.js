/*
The tile component adds tile positioning functions and helper functions for tile based games.
*/
re.tile = re.c('tile')
.statics({
    sizeX:40,
    sizeY:40,
    
    roundX:function(x, size){
        if(!re.is(size)){
            size = this.sizeX;
        }
        return x - size * 0.5 + 0.5 | 0;
    },
    
    roundY:function(y, size){
        if(!re.is(size)){
            size = this.sizeY;
        }
        return y - size * 0.5 + 0.5 | 0;
    },
    
    roundTileX:function(x, size){
        if(!re.is(size)){
            size = this.sizeX;
        }
        return this.roundX(x, size) / size;
    },
    
    roundTileY:function(y, size){
        if(!re.is(size)){
            size = this.sizeY;
        }
        return this.roundY(y, size) / size;
    }
    
})
.defaults({
    
    posX:0,
    posY:0
    
})
.init(function(){
    this.def({
        sizeX: re.tile.sizeX,
        sizeY: re.tile.sizeY
    });
})
.extend({

    tile:function(x, y){
        if(arguments.length == 2){
            this.tileX(x);
            return this.tileY(y);
        }
        return this;
    },
    
    tileX:function(v){
        if(re.is(v)){
            this.posX = v - this.sizeX * 0.5 + 0.5 | 0;
            return this;
        }
        return this.posX / this.sizeX | 0;
    },
    
    tileY:function(v){
        if(re.is(v)){
            this.posY = v - this.sizeY * 0.5 + 0.5 | 0;
            return this;
        }
        return this.posY / this.sizeY | 0;
    }
    
});