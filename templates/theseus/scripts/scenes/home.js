re.scene('home')
.enter(function(){
  
  re.iso.sizeX = 25;
  re.iso.sizeY = 25;
  re.iso.sizeZ = 25;
  
  var map = [
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0]
  ];
  
  for(var y=0; y<map.length; y++){
    for(var x=0; x<map[0].length; x++){
      var e = re.e('isoimage')
      .iso(x, y);
      
    }
  }
  
  var cursor = re.e('isoimage');
  
  re.e('mouse')
  .on('mousemove', function(pos){
    
    cursor.attr(re.iso.toPos(pos.screenX, pos.screenY));
    
  })
  .on('click', function(pos){
    var iso = re.iso.toIso(pos.screenX, pos.screenY);
    console.log(iso.isoX, iso.isoY)
  })
  
  re.screen.posX -= 100;
  
});