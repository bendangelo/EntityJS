
/*
Goes to an other scene in the game. This calls the scene method with a possible object argument.

Scenes are a helpful way to organize stages of a game.

//create scene
re.scene('game')
.enter(function(data){
	
	//remove all 2d elements
	re('2d').dispose();
	
	loadLevel(data.level);
	
});

//go to scene
re.scene('game').enter({tiles:[]} );

*warning- bad idea passing in functions as the first argument

//create manually
re.e('scene:game')
.enter(function(){
  
})

*/

re.c('scene')
.statics({
	
	_scenes:{}
	
})
.method(function(title){
	var d = re.scene;
	
  if(!re.is(title)){
    return d._scenes[re.scene.current];
  }
  
	if(!d._scenes[title]){
		//add scene
		re.e('scene:'+title);
	}
	
	return d._scenes[title];
})
.init(function(title){
	
	re.scene._scenes[title] = this;
	this.sceneName = title;
	
})
.dispose(function(){
	
	delete re.scene._scenes[this.sceneName];
	
})
.defines({
	
	enter:function(title){
    if(!re.is(title, 'function')){
      
      if(re.scene.current)
      re.scene().exit();
      
      //set current scene
  		re.scene.current = this.sceneName
  		
      if(this.scene_enter)
    		this.scene_enter.apply(this, arguments);
        
    } else {
      //set new enter method
  		this.scene_enter = title;
    }
		
		return this;
	},
	
	exit:function(m){
    if(!re.is(m, 'function')){
      
      re.scene.current = '';
      
      if(this.scene_exit)
      this.scene_exit.apply(this, arguments);
    } else {
  		this.scene_exit = m;
    }
		
		return this;
	}
  
});