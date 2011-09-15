
/*
Goes to an other scene in the game. This calls the scene method with a possible object argument.

Scenes are a helpful way to organize stages of a game.

//create scene
re.scene('game', function(data){
	
	//remove all 2d elements
	re('2d').dispose();
	
	loadLevel(data.level);
	
});

//go to scene
re.scene('game', {tiles:[]} );

*/
re.c('scene')
.static({
	
	_scenes:{},
	current:'',
	
	/*
	The scene method is the main area for scene commands.
	
	//create a scene
	re.c('scene').scene('home', function(){});
	
	//goto a scene
	re.c('scene').scene('home', 'yo');
	
	//delete a scene
	re.c('scene').scene('-home');
	
	//combine delete home goto title sceen
	re.c('scene').scene('-home title');
	*/
	scene:function(title){
		var s = re.c('scene');
	
		//split into multiple calls
		var k = title.split(' ');
		if(k.length > 1){
			title = k.pop();
			
			for(var b in k){
				re.c('scene').scene.apply(s, arguments);
			}
		}
		
		//delete scene
		if(title.charAt(0) == '-'){
			
			var t = s._scenes[title.substr(1)];
			delete s._scenes[title.substr(1)];
			
			return t;
			
		} else if(s._scenes[title]){
		//go to scene
				
			//call exit
			var t = s._scenes[s.current];
			if(s.current != '' && typeof t.scene_exit == 'function'){
				t.scene_exit.call(t, title);
				
			}
			
			s.current = title;
			
			t = s._scenes[title];
			
			if(typeof t.scene_enter == 'function'){
				t.scene_enter.apply(t, Array.prototype.slice.call(arguments, 1));
			}
			
			
		} else {
		
			//add scene
			re.e('scene:'+title);
		}
		
		return s._scenes[title];
	}

	
})
.init(function(c, title){
	
	c._scenes[title] = this;
	this.sceneName = title;
	
})
.dispose(function(c){
	
	delete c._scenes[this.sceneName];
	
})
.define({
	
	enter:function(m){
		this.scene_enter = m;
		
		return this;
	},
	
	exit:function(m){
		this.scene_exit = m;
		
		return this;
	},
	
	scene:function(title){
		return re.c('scene').apply(this, arguments);
	}
});

//shortcut method
re.scene = re.c('scene').scene;