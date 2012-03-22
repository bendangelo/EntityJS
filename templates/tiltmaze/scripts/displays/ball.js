re.c('ball')
.requires('tile circle keyboard update')
.defines({
  color:'#ff0000',
  speed:6,
  moving:false,
  pad:5,
  
  move:function(x, y){
    
    var tx = this.tileX();
    var ty = this.tileY();
    
    var tile = this.level.automap(tx, ty);
    var tileAfter = this.level.automap(tx+x, ty+y);
    
    if(tileAfter && !tile.checkWallInside(x, y) && !tileAfter.checkWall(x, y)){
      
      if(y){
        this.posY += this.speed * y;
      }
      if(x){
        this.posX += this.speed * x;
      }
      
    } else {
      this.tile(tx, ty);
      this.moving = false;
      this.off('update');
      this.trigger('move:finish')
    }
    
    this.trigger('move:update');
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
  
  this.on('keydown', this.keydown);
});