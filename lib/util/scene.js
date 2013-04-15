
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
		d._scenes[title] = re.e('scene')
        .attr('sceneName', title);
	}
	
	return d._scenes[title];
})
.defines({

	enter:function(title){
    if(!re.is(title, 'function')){
      
      //enter scene

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
          //exit scene
          re.scene.current = '';
          
          if(this.scene_exit)
              this.scene_exit.apply(this, arguments);
        } else {
            //set new exit method
      		this.scene_exit = m;
        }
		
		return this;
	}
  
});