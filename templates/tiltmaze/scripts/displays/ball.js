re.c('ball')
.requires('tile circle hit keyboard update')
.defines({
  color:'#ff0000',
  speed:13,
  moving:false,
  pad:5,
  
  move:function(x, y){
    
    var tx = this.tileX();
    var ty = this.tileY();
    
    var tile = this.level.automap(tx, ty);
    var tileAfter = this.level.automap(tx+x, ty+y);
    
    console.log(tile.checkWallInside(x, y), tileAfter.checkWall(x, y))
    if(tileAfter && !tile.checkWallInside(x, y) && !tileAfter.checkWall(x, y)){
      
      if(y){
        this.posY += this.speed * y;
      }
      if(x){
        this.posX += this.speed * x;
      }
      
    } else {
      this.tileX(tx);
      this.tileY(ty);
      this.moving = false;
      this.off('update');
    }
  },
  
  checkHit:function(){
    var that = this;
    re('target').each(function(){
      if(that.hit(this)){
        this.dispose();
      }
    });
    
    if(re('target').length == 0){
      re.scene().advance();
    }
    
  },
  
  keydown:function(key){
    if(this.moving) return;
    this.moving = true;
    
    switch(key){
      case 'a':
      case 'left':
        this.on('update', function(){
          this.move(-1, 0);
        });
      break;
      
      case 'd':
      case 'right':
        this.on('update', function(){
          this.move(1, 0);
        });
      break;
      
      case 's':
      case 'down':
        this.on('update', function(){
          this.move(0, 1);
        });
      break;
      
      case 'w':
      case 'up':
        this.on('update', function(){
          this.move(0, -1);
        });
      break;
      
      default:
      this.moving = false;
      break;
    }
    
  }
  
})
.init(function(){
  //this.regX = this.regY = -this.pad;
  this.level = re.scene().currentLevel;
  
  this.on('keydown', this.keydown);
});