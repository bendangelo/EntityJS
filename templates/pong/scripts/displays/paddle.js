re.c('paddle')
.requires('rect align limit hit')
.defines({
  color:'#fff',
  sizeX:6,
  sizeY:30,
  alignVer:0,
  alignLeft:10,
  speed:10,
  
  checkBounds:function(){
    this.limit('posY', 0, re.sys.sizeY - this.sizeY);
  }
  
});