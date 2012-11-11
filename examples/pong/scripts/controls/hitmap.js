re.c('hitmap')
.defines({
  
  //things to note:
  //paddle and ball are centered to make calculations easier
  checkHit:function(obj){
    var res = {
      posX:obj.posX,
      posY:obj.posY
    };
    
    //check collisions against top and bottom
    if(obj.posY - obj.hsizeY < 0){
      res.hitY = 1;
      res.posY = obj.hsizeY;
    } else if(obj.posY + obj.hsizeY > re.loop().sizeY){
      res.hitY = 1;
      res.posY = re.loop().sizeY - obj.hsizeY;
    }
    
    //check hits against right and left
    if(obj.posX - obj.hsizeX < 0){
      res.hitX = 1;
      this.trigger('score:left');
    } else if(obj.posX + obj.hsizeX > re.loop().sizeX){
      res.hitX = 1;
      this.trigger('score:right');
    }
    
    //check hits on paddles
    re('paddle').each(function(i){
      
      if(i.hit(obj)){
        res.hitX = 1;
        
        var push = obj.hsizeX + i.hsizeX + 1;
        
        if(i.posX > obj.posX){
          push *= -1;
        }
        res.posX = i.posX + push;
        
      }
      
    });
    
    //if everythings ok, move forward
    if(!res.hitX) res.posX += obj.velX;
    if(!res.hitY) res.posY += obj.velY;
    
    return res;
  }
  
});