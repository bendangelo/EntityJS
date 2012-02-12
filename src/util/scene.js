
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
re.scene = function(title){
	var s = re.c('scene');
	
  if(!re.is(title)){
    return s._scenes[re.current.scene];
  }
  
	if(!s._scenes[title]){
		//add scene
		re.e('scene:'+title);
	}
	
	return s._scenes[title];
};

re.c('scene')
.statics({
	
	_scenes:{}
	
})
.init(function(c, title){
	
	c._scenes[title] = this;
	this.sceneName = title;
	
})
.dispose(function(c){
	
	delete c._scenes[this.sceneName];
	
})
.defines({
	
	enter:function(title){
    if(!re.is(title, 'function')){
      
      if(re.scene.current)
      re.scene().exit(title);
      
      //set current scene
  		re.scene.current = this.sceneName
  		
      if(this.scene_enter)
  		this.scene_enter.apply(this, arguments);
      
    }
    //set new enter method
		this.scene_enter = title;
		
		return this;
	},
	
	exit:function(m){
    if(!re.is(m, 'function')){
      
      re.scene.current = '';
      
  		if(re.is(this.scene_exit, 'function')){
  			this.scene_exit.apply(this, arguments);
  		}
      
      if(this.scene_exit)
      this.scene_exit.apply(this, arguments);
    }
		this.scene_exit = m;
		
		return this;
	}
  
});