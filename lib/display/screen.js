/*
The screen component is used for scrolling or shaking all visible objects. 
It simply offsets pos values upon rendering.

This is useful for setting up a tile-based game.
*/
re.c('screen')
.singleton()
.requires('hit')
.defines({
    
    pos:function(x, y){
      if(!arguments.length){
        return this;
      }
      if(re.is(x,'object')){
        y = x.posY;
        x = x.posX;
      }
      
      this.posX = x - this.regX - this.offX;
      this.posY = y - this.regY - this.offY;
      
      return this;
    },
    
    toScreenX:function(x){
        return x + this.posX - this.offX - this.regX;
    },
    
    toScreenY:function(y){
        return y + this.posY - this.offY - this.regY;
    }
    
})
.defaults({
    
    posX:0,
    posY:0,
    
    regX:0,
    regY:0,
    
    sizeX:0,
    sizeY:0,
    
    offX:0,
    offY:0
    
});