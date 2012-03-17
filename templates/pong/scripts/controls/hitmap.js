re.c('hitmap')
.defines({
  
  checkHit:function(obj){
    var res = {
      posX:obj.posX,
      posY:obj.posY
    };
    
    if(obj.posY < 0 || obj.posY + obj.sizeY > re.sys.sizeY){
      res.hitY = 1;
      
      if(obj.posY < 0){
        res.posY = 0;
      } else {
        res.posY = re.sys.sizeY - obj.sizeY;
      }
      
    }
    
    //score..
    if(obj.posX - obj.sizeX < 0){
      res.hitX = 1;
      this.trigger('hit:left');
    } else if(obj.posX + obj.sizeX > re.sys.sizeX){
      this.trigger('hit:right');
      res.hitX = 1;
    }
    
    //check hits on paddles
    re('paddle').each(function(){
      
      if(this.hit(obj)){
        res.hitX = 1;
        
        res.posX = this.posX - obj.sizeX - 1;
      }
      
    });
    
    if(!res.hitX) res.posX += obj.velX;
    if(!res.hitY) res.posY += obj.velY;
    
    return res;
  }
  
});