/*
The draw component defines draw properties on an entity.
*/
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
    Returns true or false wether the object is visible on screen.
    */
    visible:function(){

        return this.drawable && re.screen().hit(this.posX, this.posY, this.sizeX, this.sizeY, this.regX, this.regY);

    }

});