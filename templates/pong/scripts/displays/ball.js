re.c('ball')
.requires('rect align force limit')
.defines({
  color:'#fff',
  sizeX:5,
  sizeY:5,
  
  resX:1.01,
  resY:1.01,
  
  friX:1,
  friY:1,
  
  initVel:5,
  
  reset:function(){
    this.alignHor();
    this.alignVer();
    this.velX = re.random(-this.initVel, this.initVel);
    this.velY = re.random(-this.initVel, this.initVel);
  }
  
})
.init(function(){
  
})