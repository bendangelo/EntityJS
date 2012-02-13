re.c('hero')
.requires('hero.png tsprite update force')
.defines({
  
  speed:10,
  
  friX:0.4,
  friY:0.4,
  
  bodyX:25,
  bodyY:25,
  
  update:function(){
    
    if(re.pressed('a')){
      this.velX -= this.speed;
    }
    
    if(re.pressed('w')){
      this.velY -= this.speed;
    }
    
    if(re.pressed('s')){
      this.velY += this.speed;
    }
    
    if(re.pressed('d')){
      this.velX += this.speed;
    }
    
  }
})
.init(function(){
  
  this.on('update', this.update);
  
});