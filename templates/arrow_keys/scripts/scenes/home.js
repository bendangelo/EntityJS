/*
The home scene is the entry point of the game.
It creates a new controls entity and a starting arrow to play with.
*/
re.scene('home')
.enter(function(){
  
  console.log('entering home scene. . .');
  
  //add controls
  re.controls = re.e('controls');
  
  //add first arrow
  re.controls.addArrow();
})
.exit(function(){
  
  console.log('exiting home scene. . .');
  
})