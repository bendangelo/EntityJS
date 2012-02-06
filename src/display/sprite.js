/*
The sprite object definess a drawable image for an entity.

@usage
var sprite = re.e('sprite player.png');

//move to frame 3
sprite.fra(3)

//get current frame
sprite.fra()

//manually move to frame
sprite.attr({fraX:0, fraY:1});

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
    
    fraX:0,
    fraY:0
    
})
.defines({
    
    fra:function(i){
      if(re.is(i)){
        this.fraX = this.biToXt(i);
        this.fraY = this.biToYt(i);
        return this;
      }
      return this.toBi(this.fraX, this.fraY);
    },
    
    draw:function(c){
        c.drawImage(this._image, this.fraX * this.sizeX, this.fraY * this.sizeY, this.sizeX, this.sizeY, -this.regX, -this.regY, this.sizeX, this.sizeY);
        
        return this;
    },
    
    //implement for flicker
    flick:function(c){
        this.fra(c);
    }
    
});