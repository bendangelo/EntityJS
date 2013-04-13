/*
The sprite object definess a drawable image for an entity.

@usage
var sprite = re.e('sprite player.png');

//move to frame 3
sprite.frame(3)

//get current frame
sprite.frame()

//manually move to frame
sprite.set({frameX:0, frameY:1});

//add animation
sprite.comp('flicker')
//add animation
sprite.flicker('run', -1, 400, [0, 2, 3, 4])
//play
sprite.flicker('run')
*/

re.c('sprite')
.requires('image bisect')
.defaults({
    
    frameX:0,
    frameY:0
    
})
.defines({
    
    frame:function(i){
      if(re.is(i)){
        this.frameX = this.biToTileX(i);
        this.frameY = this.biToTileY(i);
        return this;
      }
      return this.tileToBi(this.frameX, this.frameY);
    },
    
    draw:function(c){
        c.drawImage(this._image, this.frameX * this.sizeX, this.frameY * this.sizeY, this.sizeX, this.sizeY, -this.regX, -this.regY, this.sizeX, this.sizeY);
        
        return this;
    }
    
});