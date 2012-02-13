/*
The tsprite component is a simple extension to sprite that defaults the size attributes.
*/
re.c('tsprite')
.requires('sprite')
.init(function(){
  this.sizeX = re.tile.sizeX;
  this.sizeY = re.tile.sizeY;
});