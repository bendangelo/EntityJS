/*
The point component definess an entity that has a 2d position in space.
This can be used for 2d calculations or most commonly 2d sprite positioning.

*/

re.c('point')
.defaults({
    
    posX:0,
    posY:0
    
})
.defines({
    
    pos:function(x, y){
        if(re.is(x,'object')){
            y = x.posY || x.y;
            x = x.posX || x.x;
        }
        
        this.posX = x;
        this.posY = y;
        
        return this;
    },
    
    distanceTo:function(x, y){
        if(re.is(x,'object')){
            y = x.posY || x.y;
            x = x.posX || x.x;
        }
        var kx, ky;
        kx = x - this.posX;
        ky = y - this.posY;
        
        return Math.sqrt(kx*kx + ky*ky) + 0.5 | 0;
    }
    
});