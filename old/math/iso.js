re.c('iso')
.statics({
  sizeX:30,
  sizeY:30,
  sizeZ:30,
  
  /*
  Converts an x position into the closest iso x position.
  */
  toPosX:function(x, y){
    var isox = this.toIsoX(x, y);
    var isoy = this.toIsoY(x, y);
    
    return (isox - isoy) * this.sizeX;
  },
  
  toPosY:function(x, y){
    var isox = this.toIsoX(x, y);
    var isoy = this.toIsoY(x, y);
    
    return (isox + isoy) * this.sizeY * 0.5;
  },
  
  toPos:function(x, y){
    if(re.is(x,'object')){
      y = x.posY || x.y;
      x = x.posX || x.x;
    }
    
    return {posX:this.toPosX(x, y), posY:this.toPosY(x, y)};
  },
  
  /*
  Converts a position into the closest iso tile
  */
  toIsoX:function(x, y){
    var ym = (2*y - x) * 0.5;
    var xm = x + ym;
    
    return Math.round(xm / this.sizeX)-1;
  },
  
  toIsoY:function(x, y){
    var ym = (2*y - x) * 0.5;
    
    return Math.round(ym / this.sizeY);
  },
  
  toIso:function(x, y){
    if(re.is(x, 'object')){
      y = x.posY || x.y;
      x = x.posX || x.x;
    }
    return {isoX:this.toIsoX(x,y), isoY:this.toIsoY(x, y)};
  }
  
})
.defaults({
  posX:0,
  posY:0,
  posZ:0
})
.defines({
  
  /*
    Moves the iso entity to the given isometric position.
    
    examples:
    
    e.iso(1, 0, 0);
    
    e.iso(otherIso);
    
    e.iso({x:1, y:1, z:2});
  */
  iso:function(x, y, z){
    if(re.is(x,'object')){
      z = x.z
      if(re.is(x.posZ)){
        z = x.posZ / re.iso.sizeZ;
      }
      y = x.y;
      
      //copy attributes
      if(re.is(x.posX) && re.is(x.posY)){
        this.posX = x.posX;
        this.posY = x.posY;
        if(x.posZ){
          this.posZ = x.posZ;
        }
        return this;
      }
      
      x = x.x;
      
    }
    
    //convert to screen space
    x = (re.is(x)) ? x : this.isoX();
    x *= re.iso.sizeX;
    
    //posY handles a lot of transformations, its safest to recalculate it
    y = (re.is(y)) ? y : this.isoY();
    y *= re.iso.sizeY;
    
    z = (re.is(z)) ? z : this.isoZ();
    z *= re.iso.sizeZ;
    
    //all values should be in screen space from here
    this.posX = x - y;
    this.posY = (x + y) * 0.5 - z;
    this.posZ = z;
    
    return this;
  },
  
  isoX:function(value){
    if(re.is(value)){
      
      return this.iso(value);
    }
    
    return (this.posX + (2*(this.posY+this.posZ) - this.posX) * 0.5) / re.iso.sizeX;
  },
  
  isoY:function(value){
    if(re.is(value)){
      
      return this.iso({y:value});
    }
    
    return ((2*(this.posY+this.posZ) - this.posX) * 0.5) / re.iso.sizeY;
  },
  
  isoZ:function(value){
    if(re.is(value)){
      
      return this.iso({z:value});
    }
    
    return this.posZ / re.iso.sizeZ;
  },
  
  //returns true if the current iso position is directly on top of a tile.
  onIso:function(){
    var total = this.isoX() + this.isoY() + this.isoZ();
    return (total|0) == total;
  }
  
});