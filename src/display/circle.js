/*
The circle component draws a rectangle on screen.
*/
re.c('circle')
.requires('draw')
.defaults({
    color:'#82d5f4'
})
.defines({
    
    draw:function(c){
        
        c.fillStyle = this.color;
        
        c.beginPath();
        
            c.arc(-this.regX + this.sizeX , -this.regY + this.sizeX , this.sizeX, 0, Math.PI*2, true);
        
        c.closePath();
        
        c.fill();
        return this;
    },
    
    radius:function(r){
        if(re.is(r)){
            this.sizeX = this.sizeY = r;
            return this;
        }
        return this.sizeX;
    }
    
});