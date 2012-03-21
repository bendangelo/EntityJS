re.c('walltile')
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
    
    //second wall
    if(this.bottomWall){
      c.fillRect(0, this.sizeY - this.thick, this.sizeX, this.thick);
    }
    
    
    //third wall
    
    //fourth wall
    
  },
  
  leftOpen:function(){
    return false;
  },
  
  rightOpen:function(){
    return false;
  }
  
});