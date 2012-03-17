re.c('player')
.requires('update')
.defines({
  
  alignRight:-10,
  
  update:function(){
    
    if(re.pressed('w')){
      this.posY -= this.speed;
    } else if(re.pressed('s')){
      this.posY += this.speed;
    }
    
    this.checkBounds();
  }
  
})
.init(function(){
  
  this.on('update', this.update);
  
});