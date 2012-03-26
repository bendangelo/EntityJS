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
  .attr('screenable', true)
  .on('mousemove', function(x, y){
    
    cursor.attr(re.iso.toPos(x, y));
    
  })
  .on('click', function(x, y){
    var iso = re.iso.toIso(x, y);
    console.log(iso.isoX, iso.isoY)
  })
  
  re.screen.posX -= 100;
  
});