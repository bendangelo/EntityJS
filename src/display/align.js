/*
The align component contains helper methods for positioning entities relative to system size.

@warning aligning with negative values will not round down but up!

*/
re.c('align')
.requires('draw')
.defines({
    
  align:function(x, y){
    this.alignHor(x);
    return this.alignVer(y);
  },
  
    alignHor:function(o){
        o = o || 0;
        this.posX = re.sys.sizeX * 0.5 - (this.sizeX - this.regX)*0.5 + o | 0;
        
        return this;
    },
    
    alignVer:function(o){
        o = o || 0;
        this.posY = re.sys.sizeY * 0.5 - (this.sizeY - this.regY)*0.5 + o | 0;
        return this;
    },
    
    alignRight:function(x){
        x = x || 0;
        this.posX = re.sys.sizeX - (this.sizeX - this.regX) + x | 0;
        return this;
    },
    
    alignLeft:function(x){
        x = x || 0;
        this.posX = x + this.sizeX - (this.sizeX - this.regX) | 0;
        return this;
    },
    
    alignTop:function(y){
        y = y || 0;
        this.posY = y + this.sizeY - (this.sizeY - this.regY) | 0;
        return this;
    },
    
    alignBottom:function(y){
        y = y || 0;
        this.posY = re.sys.sizeY - (this.sizeY - this.regY) + y | 0;
        return this;
    }
    
});