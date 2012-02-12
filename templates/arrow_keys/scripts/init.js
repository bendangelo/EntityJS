//runs when the window is finished loading
re.ready(function(){
  //Starts the system and listens for inputs
  //re.canvas in automatically defined and can be changed in config.yml
  re.sys.init(re.canvas).start();
  
  //enter the next scene
  re.scene('load').enter();
  
});