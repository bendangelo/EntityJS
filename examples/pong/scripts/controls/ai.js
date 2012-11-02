re.c('ai')
.requires('paddle update point')
.defines({
  
  update:function(){
    
    var ball = re('ball')[0];
    
    if(this.distance(ball.posX, this.posY) > 150) return;
    
    if(ball.posY + ball.hsizeY > this.posY + this.hsizeY){
      this.posY += this.speed;
    } else if(ball.posY - ball.hsizeY < this.posY - this.hsizeX){
      this.posY -= this.speed;
    }
    
    this.checkBounds();
  }
  
})
.init(function(){
  
  this.on('update', this.update);
  
})
.dispose(function(){
  
  this.off();
  
});