/*
The tsprite component is a simple extension to sprite that defaults the size attributes.
*/
re.c('tsprite')
.requires('sprite')
.init(function(){
  this.sizeX = re.tile.sizeX;
  this.sizeY = re.tile.sizeY;
  
  this.bodyX = re.tile.sizeX;
  this.bodyY = re.tile.sizeY;
  
  //setup registration point
  this.regX = this.sizeX * 0.5;
  this.regY = this.sizeY * 0.5;
  
});