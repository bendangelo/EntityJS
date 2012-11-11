re.c('paddle')
.requires('rect align limit hit')
.defines({
  color:'#fff',
  sizeX:6,
  sizeY:30,
  
  hsizeX:3,
  hsizeY:15,
  
  regX:3,
  regY:15,
  
  alignVer:0,
  alignLeft:10,
  speed:10,
  
  checkBounds:function(){
    this.limit('posY', this.hsizeY, re.loop().sizeY - this.hsizeY);
  }
  
});