re.c('walltile')
.statics({
  factory:function(num){
    var e = re.e('walltile');
    switch(num){
      case 1:
      return e.set({
        topWall:true
      });
      
      case 2:
      return e.set({
        rightWall:true
      });
      
      case 3:
      return e.set({
        bottomWall:true
      });
      
      case 4:
      return e.set({
        leftWall:true
      });
      
      case 5:
      return e.set({
        topWall:true,
        rightWall:true
      });
      
      case 6:
      return e.set({
        bottomWall:true,
        rightWall:true
      });
      
      case 7:
      return e.set({
        leftWall:true,
        bottomWall:true
      });
      
      case 8:
      return e.set({
        topWall:true,
        leftWall:true
      });
      
      case 10:
      return e.set({
        leftWall:true,
        bottomWall:true,
        rightWall:true
      });
      
      case 11:
      return e.set({
        rightWall:true,
        topWall:true,
        bottomWall:true
      });
      
      case 12:
      return e.set({
        topWall:true,
        rightWall:true,
        leftWall:true
      })
      
      case 13:
      return e.set({
        topWall:true,
        leftWall:true,
        bottomWall:true
      })
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
  
  thick:3,
  
  draw:function(c){
    
    c.fillStyle = '#000';
    
    //first wall
    if(this.topWall){
      c.fillRect(0, 0, this.sizeX, this.thick);
    }
    
    //bottom wall
    if(this.bottomWall){
      c.fillRect(0, this.sizeY - this.thick, this.sizeX, this.thick);
    }
    
    //left wall
    if(this.leftWall){
      c.fillRect(0, 0, this.thick, this.sizeY);
    }
    
    //right wall
    if(this.rightWall){
      c.fillRect(this.sizeX - this.thick, 0, this.thick, this.sizeY); 
    }
    
  },
  
  checkWall:function(x, y){
    if(y == 1){
      return this.topWall;
    } else if(y == -1){
      return this.bottomWall;
    }
    
    if(x == 1){
      return this.leftWall;
    } else if(x == -1){
      return this.rightWall;
    }
    
  },
  
  checkWallInside:function(x, y){
    if(y == 1){
      return this.bottomWall;
    } else if(y == -1){
      return this.topWall;
    }
    
    if(x == 1){
      return this.rightWall;
    } else if(x == -1){
      return this.leftWall;
    }
  }
  
});