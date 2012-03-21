re.c('ball')
.requires('tile circle tween')
.defines({
  color:'#ff0000',
  pad:5
})
.init(function(){
  this.regX = this.regY = -this.pad;
  this.radius(re.tile.sizeX / 2 - this.pad);
});