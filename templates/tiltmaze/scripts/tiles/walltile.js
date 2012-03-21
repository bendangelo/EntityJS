re.walltile = re.c('walltile')
.statics({
  factory:function(num){
    var e = re.e('walltile');
    switch(num){
      case 1:
      return e.attr({
        topWall:true
      });
      
      case 2:
      return e.attr({
        rightWall:true
      });
      
      case 3:
      return e.attr({
        bottomWall:true
      });
      
      case 4:
      return e.attr({
        leftWall:true
      });
      
      case 5:
      return e.attr({
        topWall:true,
        rightWall:true
      });
      
      case 6:
      return e.attr({
        bottomWall:true,
        rightWall:true
      });
      
      case 7:
      return e.attr({
        leftWall:true,
        bottomWall:true
      });
      
      case 8:
      return e.attr({
        topWall:true,
        leftWall:true
      });
    }
    
    return null;
  }
})
.requires('tile draw')
.defines({
  
  leftWall:false,
  rightWall:false,
  topWall:false,
  bottomWall:false,
  
  thick:5,
  
  draw:function(c){
    
    c.fillStyle = '#000';
    
    //first wall
    if(this.topWall){
      c.fillRect(0, 0, this.sizeX, this.thick);
    }
    
    //bottom wall
    if(this.bottomWall){
      c.fillRect(0, this.sizeY - this.thick-1, this.sizeX, this.thick+1);
    }
    
    //left wall
    if(this.leftWall){
      c.fillRect(0, 0, this.thick, this.sizeY);
    }
    
    //right wall
    if(this.rightWall){
      c.fillRect(this.sizeX - this.thick-1, 0, this.thick+1, this.sizeY); 
    }
    
  },
  
  leftOpen:function(){
    return false;
  },
  
  rightOpen:function(){
    return false;
  }
  
});