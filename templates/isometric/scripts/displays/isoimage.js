re.c('isoimage')
.requires('iso sprite isotiles.png')
.defines({
  
  sizeX:51,
  layer:0,
  
  isoHeight:function(){
    //high tile
    if(this.frameX == 1){
      return 10;
    }
    return 0;
  },
  
  place:function(x, y){
    //find the tile height
    var height = re.currentLevel.tileHeight(x, y);
    
    this.iso(x, y, height / re.iso.sizeZ);
    
  },
  
  depth:function(){
    return this.posY + this.layer + this.posZ;
  }
  
})
.init(function(){
  //pushes tiles up so they are leveled
  this.regY = this.sizeY - re.iso.sizeY;
});