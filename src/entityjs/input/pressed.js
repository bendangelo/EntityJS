re.c('pressed')
.static({
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
	*/
	pressed:function(key){
		var that = re.c('pressed');
		
		if(arguments.length > 1){
			
			for(var i=0; i<arguments.length; i++){
				if(that._pressed[arguments[i]]){
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
	},
	
});