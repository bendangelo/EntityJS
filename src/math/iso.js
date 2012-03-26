/*

*/
re.iso = re.c('iso')
.statics({
  sizeX:60,
  sizeY:60,
  sizeZ:60,
  
  /*
  Converts an x position into the closest iso x position.
  */
  toX:function(x, y, size){
    size = size || re.iso.sizeX;
    var isox = this.toIsoX(x, y, size);
    var isoy = this.toIsoY(x, y, size);
    
    return (isox - isoy) * size;
  },
  
  toY:function(x, y, z, size){
    size = size || re.iso.sizeY;
    z = z || 0;
    var isox = this.toIsoX(x, y, size);
    var isoy = this.toIsoY(x, y, size);
    
    return (isox + isoy) * size * 0.5 + z;
  },
  
  toIsoX:function(x, y, size){
    size = size || this.sizeX;
    var ym = (2*y - x) * 0.5;
    var xm = x + ym;
    
    return Math.round(xm / size)-1;
  },
  
  toIsoY:function(x, y, size){
    size = size || this.sizeY;
    
    var ym = (2*y - x) * 0.5;
    
    return Math.round(ym / size);
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
      z = x.z;
      y = x.y;
      
      //copy attributes
      if(re.is(x.posX) && re.is(x.posY)){
        this.posX = x.posX;
        this.posY = x.posY;
        if(x.posZ) this.posZ = x.posZ;
        return this;
      }
      
      x = x.x;
      
    }
    
    //convert to screen space
    x = (re.is(x)) ? x * this.sizeX : this.posX;
    y = (re.is(y)) ? y * this.sizeY : this.posY;
    z = (re.is(z)) ? z * this.sizeZ : this.posZ;
    
    //all values should be in screen space from here
    this.posX = x - y;
    this.posY = (x + y) * 0.5 + z;
    this.posZ = z;
    
    return this;
  },
  
  isoX:function(value){
    if(re.is(value)){
      
      return this.iso(value);
    }
    
    return (this.posX + (2*(this.posY-this.posZ) - this.posX) * 0.5) / this.sizeX;
  },
  
  isoY:function(value){
    if(re.is(value)){
      
      return this.iso({y:value});
    }
    
    return re.iso.toIsoY(this.posX, this.posY, this.posZ, this.sizeY);
  },
  
  isoZ:function(value){
    if(re.is(value)){
      
      return this.iso({z:value});
    }
    
    return this.posZ / this.sizeZ;
  }
  
})
.init(function(){
  this.sizeX = re.iso.sizeX;
  this.sizeY = re.iso.sizeY;
  this.sizeZ = re.iso.sizeZ;
});