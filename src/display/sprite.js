/*
The sprite object definess a drawable image for an entity.
*/

re.c('sprite')
.requires('image bisect')
.defaults({
    
    frameX:0,
    frameY:0
    
})
.defines({
    
    setFrameId:function(id){
        this.frameX = this.biToXt(id);
        this.frameY = this.biToYt(id);
        
        return this;
    },
    
    getFrameId:function(){
        return this.toBi(this.frameX, this.frameY);
    },
    
    draw:function(c){
        c.drawImage(this.image, this.frameX * this.sizeX, this.frameY * this.sizeY, this.sizeX, this.sizeY, -this.regX, -this.regY, this.sizeX, this.sizeY);
        
        return this;
    },
    
    //implement for flicker
    flick:function(c){
        this.setFrameId(c);
    }
    
});