re.ready(function(){
  
  re.tile.sizeX = re.tile.sizeY = 25;
  
  re.sys.clearColor = '#D6F8FA';
  
  re.sys.init(re.canvas).start();
  
  //setup gravity
  re.force.graY = 2;
  
  re.scene('load').enter();
  
});