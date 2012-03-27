re.c('isoimage')
.requires('sprite isotiles.png')
.defines({
  
  sizeX:51
  
})
.init(function(){
  //pushes tiles up so they are leveled
  this.regY = this.sizeY-re.iso.sizeY;
});