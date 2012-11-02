re.c('level')
.requires('automap')
.statics({
  get:function(num){
    //find entity with component
    return re('level'+num+'.json')[0];
  }
})
.defines({
  
  setup:function(){
    
    //default value for blanks in automap
    this.automapDefault = re.e('walltile');
    
    for(var y=0; y<this.map.length; y++){
      for(var x=0; x<this.map[0].length; x++){
        
        var tile = this.map[y][x];
        
        if(!tile) continue;
        
        //place tiles
        var e = re.walltile.factory(tile)
        .tile(x, y);
        
        this.automap(x, y, e);
        
      }
    }
    
    //place ball
    this.ball = re.e('ball')
    .tile(this.start[0], this.start[1])
    .on('move:update', this.checkTargets);
    
    this.ball.level = this;
    
    re('target').dispose();
    
    //place target
    for(var i in this.targets){
      var targ = this.targets[i];
      
      re.e('target')
      .tile(targ[0], targ[1]);
      
    }
    
  },
  
  checkTargets:function(){
    
    var ball = this;
    
    re('target').each(function(i){
      
      if(ball.tileX() == i.tileX() && i.tileY() == ball.tileY()){
        i.dispose();
      }
      
    });
    
    if(re('target').length == 0){
      re.scene('game').advance();
    }
  },
  
  teardown:function(){
    //remove tiles
    re('walltile').dispose();
    
    re('target').dispose();
    
    //remove ball
    re('ball').dispose();
  }
  
})
.dispose(function(){
  this.teardown();
});