re.c('level')
.requires('automap')
.defines({
  
  setup:function(){
    
    re.iso.sizeX = 25;
    re.iso.sizeY = 25;
    re.iso.sizeZ = 25;
    
    //setups layers for objects on the same tile
    re.depth.cursor = 1;
    re.depth.box = 2;
    
    for(var y=0; y<this.map.length; y++){
      for(var x=0; x<this.map[0].length; x++){
        
        var e = re.e('isoimage');
        
        var tile = this.map[y][x];
        
        if(tile == 1){
          e.frame(1);
          e.sizeY = 35;
        }
        
        e.iso(x, y);
        
        //place in map
        this.automap(x, y, e);
      }
    }
    
    this.cursor = re.e('cursor')
    .attr('layer', re.depth.cursor);
    
    this.box = re.e('isoimage')
    .attr({
      id:'box',
      frameX:3,
      drawable:false,
      layer:re.depth.box
    });
    
  },
  
  tileHeight:function(x, y){
    var tile =  this.automap(x, y);
    if(!tile){
      return 0;
    }
    return tile.isoHeight();
  }
  
})