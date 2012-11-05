re.c('draw')
.defaults({
    screenable:true,
    drawable:true,
    rotation:0,
    alpha:1,
    
    scaleX:1,
    scaleY:1,
    
    posX:0,
    posY:0,
    
    sizeX:10,
    sizeY:10,
    
    regX:0,
    regY:0
    
})
.defines({
      
    screenX:function(x){
        if(x){
            this.posX = x + re.screen().posX;
            return this;
        }
        return this.posX - re.screen().posX;
    },
    
    screenY:function(y){
        if(y){
            this.posY = y + re.screen().posY;
            return this;
        }
        return this.posY - re.screen().posY;
    },
    
    /*
    Renders the entity to the canvas. Goes through the transformations, scaling, alpha etc...
    */
    render:function(c){
        
        this.draw_before(c);
            this.draw(c);
        this.draw_after(c);
    },
    
    /*
    Returns true or false wether the object is visible on screen.
    */
    visible:function(){
        
        return this.drawable && re.screen().hit(this.posX, this.posY, this.sizeX, this.sizeY, this.regX, this.regY);
        
    }
    
})
.namespaces({
    
    before:function(c){
        
        c.save();
        
        if(this.alpha-1)
            c.globalAlpha = this.alpha;
        
      if(this.screenable)
        c.translate(this.screenX(), this.screenY());
      else
        c.translate(this.posX, this.posY);
        
        if(this.rotation)
            c.rotate(this.rotation * Math.PI / 180);
        
        
        if(this.scaleX != 1 || this.scaleY != 1)
            c.scale(this.scaleX, this.scaleY);
        
    },
    
    after:function(c){
        c.restore();
    }
    
});