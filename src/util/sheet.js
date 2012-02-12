/*
The sheet component converts a each frame of a sprite sheet into their own components.
*/
re.sheet = function(map, components, sizeX, sizeY){
        
    var frameWidth = sizeX || re.tile.sizeX;
    var frameHeight = sizeY || re.tile.sizeY;
    
    if(re.is(components,'array')){
      components = components.join(' ');
    }
        
    //create new sprites for sheet
        
    //save frame positions from map
    var x;
    var y;
    var b = [];
    for(var p in map){
        x = map[p][0] || 0;
        y = map[p][1] || 0;
        b.push(p);
        re.c(p)
        .requires('sprite '+components)
        .defines({
      frameX:x,
      frameY:y,
      sizeX:frameWidth,
      sizeY:frameHeight
        });
            
    }
  
    return b;
};