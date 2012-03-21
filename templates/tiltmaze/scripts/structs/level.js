re.level = re.c('level')
.requires('automap')
.statics({
  get:function(num){
    //find entity with component
    return re('level'+num+'.json')[0];
  }
})
.defines({
  
  setup:function(){
    
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
    re.e('ball')
    .tile(this.ball[0], this.ball[1]);
    
    //place target
    for(var i in this.targets){
      var targ = this.targets[i];
      
      re.e('target')
      .tile(targ[0], targ[1]);
      
    }
    
  },
  
  teardown:function(){
    //remove tiles
    re('walltile').dispose();
    
    re('target').dispose();
    
    //remove ball
    re('ball').dispose();
  }
  
});