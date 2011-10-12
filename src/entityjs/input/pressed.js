re.c('pressed')
.global({
	//contains pressed keys and mouse clicks
	_pressed:{},
	preventDefault:{}
	
})
.extend({
	
	/*
	This function is usually used in conjunction with mousemove or update for controls.
	
	//if either one is true
	if(this.pressed('w', 'up')){
		this.posY--;	
	}
	
	//or
	if(this.pressed(['w', 'up']){
	
	}
	
	*/
	pressed:function(){
		return re.pressed.apply(this, arguments);
	},
	
	/*
	Stops inputs default value.
	
	FUTURE
	-be able to remove prevents
	*/
	preventDefault:function(){
		re.preventDefault.apply(this, arguments);
		return this;
	}
	
})
.init(function(){
	
	//int mouse and keyboard
	re._c.keyboard.initListeners();
	re._c.mouse.initListeners();
	re._c.touch.initListeners();
	
});

re.pressed = function(key){
		var that = re.c('pressed');
		
		var c = arguments;
		
		if(typeof key == 'object') c = key;
		
		for(var i=0; i<c.length; i++){
			if(that._pressed[c[i]]){
				return true;
			}
		}
		
		return false;
}

re.preventDefault = function(key){
	
	var p = key.split(' ');
	
	if(p.length > 1){
		
		for(var k in p){
			this.preventDefault(p[k]);	
		}
		
		return this;
	}
	
	 re.c('pressed').preventDefault[key] = true;
	
	return this;
}