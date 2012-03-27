re.scene('home')
.enter(function(){
  
  re.currentLevel = re('level')[0];
  
  re.currentLevel.setup();
  
  re.screen.pos(-150, -120);
  
});