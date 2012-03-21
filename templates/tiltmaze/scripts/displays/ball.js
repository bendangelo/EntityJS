re.c('ball')
.requires('tile circle tween hit')
.defines({
  color:'#ff0000',
  pad:5,
  
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
    
  }
  
})
.init(function(){
  this.regX = this.regY = -this.pad;
  this.radius(re.tile.sizeX / 2 - this.pad);
  
  this.on('tween:update', this.checkHit);
});