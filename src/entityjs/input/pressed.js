re.c('pressed')
.global({
	//contains pressed keys and mouse clicks
	_pressed:{},
	preventDefault:{}
	
})
.define({
	
	/*
	This function is usually used in conjunction with mousemove or update for controls.
	
	//if either one is true
	if(this.pressed('w', 'up')){
		this.pos.y--;	
	}
	
	//or
	if(this.pressed(['w', 'up']){
	
	}
	
	*/
	pressed:function(key){
		var that = re.c('pressed');
		
		var c = typeof key == 'object';
		
		if(arguments.length > 1 || c){
			if(c) c = key
			else c = arguments;
			
			for(var i=0; i<c.length; i++){
				if(that._pressed[c[i]]){
					return true;
				}
			}
			
		}
		
		return that._pressed[key];
		
	},
	
	/*
	Stops inputs default value.
	
	FUTURE
	-be able to remove prevents
	*/
	preventDefault:function(key){
		
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
	
})
.init(function(){
	
	//int mouse and keyboard
	re._c.keyboard.initKeyboard();
	re._c.mouse.initMouse();
	
});