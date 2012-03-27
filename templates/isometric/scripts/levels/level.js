re.c('level')
.defines({
  
  setup:function(){
    
    re.iso.sizeX = 25;
    re.iso.sizeY = 25;
    re.iso.sizeZ = 25;
    
    for(var y=0; y<this.map.length; y++){
      for(var x=0; x<this.map[0].length; x++){
        
        var e = re.e('isoimage');
        
        var tile = this.map[y][x];
        
        if(tile == 1){
          e.frame(1);
          e.sizeY = 35;
        }
        
        e.iso(x, y);
        
      }
    }
    
    this.cursor = re.e('cursor');
    
    this.box = re.e('isoimage');
    this.box.id = 'box';
    this.box.frameX = 3;
    this.box.drawable = false;
    
  }
  
})