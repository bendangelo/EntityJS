re.c('pressed')
.statics({
	//contains pressed keys and mouse clicks
	_pressed:{},
	preventDefault:{}
	
})
.defines({
	
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
	
});

re.pressed = function(key){
		var that = re.c('pressed');
		
		var c = arguments;
		
		if(re.is(key, 'array')) c = key;
		
		for(var i=0; i<c.length; i++){
			if(that._pressed[c[i]]){
				return true;
			}
		}
		
		return false;
};
re.pressed._down = {};