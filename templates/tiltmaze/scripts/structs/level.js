re.level = re.c('level')
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
        re.e('tile'+tile)
        .tile(x, y);
        
      }
    }
    
    //place ball
    re.e('ball')
    .tile(this.ball[0], this.ball[1]);
    
    //place target
    
  },
  
  teardown:function(){
    //remove tiles
    
    //remove ball
    re('ball').dispose();
  }
  
});