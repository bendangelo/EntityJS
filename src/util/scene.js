
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
re.scene('game', {tiles:[]} );

//delete a scene
re.scene('-home');

//combine delete home goto title sceen
re.scene('-home title');
*/
re.scene = function(title){
	var s = re.c('scene');
	
	//delete scene
	if(title.charAt(0) == '-'){
		
		delete s._scenes[title.substr(1)];
		
		return s;
		
	} else if(s._scenes[title]){
	//go to scene
		
		var current = arguments.callee.current;
		
		//call exit
		var t = s._scenes[current];
		if(t && re.is(t.scene_exit, 'function')){
			t.scene_exit.call(t, title);
		}
		
		arguments.callee.current = title;
		s.curent = title;
		
		t = s._scenes[title];
		
		if(re.is(t.scene_enter, 'function')){
			t.scene_enter.apply(t, Array.prototype.slice.call(arguments, 1));
		}
		
		
	} else {
	
		//add scene
		re.e('scene:'+title);
	}
	
	return s._scenes[title];
};

re.c('scene')
.global({
	
	_scenes:{}
	
})
.init(function(c, title){
	
	c._scenes[title] = this;
	this.sceneName = title;
	
})
.dispose(function(c){
	
	delete c._scenes[this.sceneName];
	
})
.extend({
	
	enter:function(m){
		this.scene_enter = m;
		
		return this;
	},
	
	exit:function(m){
		this.scene_exit = m;
		
		return this;
	},
	
	scene:function(){
		return re.scene.apply(this, arguments);
	}
});