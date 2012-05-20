re.c('ball')
.requires('tile draw update')
.defines({
  color:'#ff0000',
  speed:6,
  moving:false,
  pad:5,
  
  draw:function(c){
    c.fillStyle = this.color;
    
    c.beginPath();
        var r = 10;
        
        c.arc(r + 5, r + 5, r, 0, Math.PI*2, true);
    
    c.closePath();
    
    c.fill();
  },
  
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
      this.on('update', this.update);
      this.trigger('move:finish');
    }
    
    this.trigger('move:update');
  },
  
  keydown:function(x, y){
    if(this.moving) return;
    this.moving = true;
    this.on('update', function(){
      this.move(x, y);
    });
  },
  
  update:function(){
    
    if(re.pressed('a', 'left')){
      this.keydown(-1, 0);
    } else if(re.pressed('d', 'right')){
      this.keydown(1, 0);
    }
    
    if(re.pressed('s', 'down')){
      this.keydown(0, 1);
    } else if(re.pressed('w', 'up')){
      this.keydown(0, -1);
    }
    
  }
  
})
.init(function(){
  
  this.on('update', this.update);
});