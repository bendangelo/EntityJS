re.c('level')
.defines({
  
  build:function(){
    if(re.hitmap){
      re.hitmap.dispose();
    }
    re.hitmap = re.e('hitmap');
    
    this.placeTiles();
    
    this.placeHero();
    
    //items requires hero to be defined first
    this.placeItems();
    
  },
  
  teardown:function(){
    //todo
  },
  
  placeTiles:function(){
    
    var map = this.layer.data.$;
    
    for(var y=0; y<map.length; y++){
      
      for(var x=0; x<map[0].length; x++){
        
        var v = map[y][x];
        
        if(v){
          v--;
          
         re.e('tile').set({
          tileX:x,
          tileY:y,
          frame:v
          });
          
          //add to hitmap
          re.hitmap.automap(x, y, 1);
          
        }
        
      }
      
    }
    
  },
  
  placeItems:function(){
    
    var gid = this.tileset[2].firstgid;
    var items = this.objectgroup[1].object;
    
    for(var i in items){
      var it = items[i];
      
      var frame = items[i].gid - gid;
      
      re.e('t'+frame).set({
        posX:it.x,
        posY:it.y - re.tile.sizeY,
        frame:frame
      });
      
    }

    //update hero last
    re('update').remove(this.hero).add(this.hero);
  },
  
  placeHero:function(){
    
    var pos = this.objectgroup[0].object;
    
    this.hero = re.e('hero')
    .set({
      posX:pos.x,
      posY:pos.y - re.tile.sizeY //tiled editor adds an extra tile to y
    });
    
  }
  
});