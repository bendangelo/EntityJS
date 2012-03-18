re.c('player')
.requires('update paddle')
.defines({
  
  upKey:'w',
  downKey:'s',
  
  update:function(){
    
    if(re.pressed(this.upKey)){
      this.posY -= this.speed;
    } else if(re.pressed(this.downKey)){
      this.posY += this.speed;
    }
    
    this.checkBounds();
  }
  
})
.init(function(){
  
  this.on('update', this.update);
  
});