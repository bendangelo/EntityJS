re.c('mouse')
.static({
	listeners:[],
	
	mouseAction:function(e){
		var button;
		
		//find which key
		if(e.which == null){
			//IE
			if(e.button < 2){
				button = 'left';	
			} else if(e.button == 4){
				button = 'middle';
			} else {
				button = 'right';	
			}
		} else {
			if(e.which < 2){
				button = 'left';	
			} else if(e.which == 2){
				button = 'middle';	
			} else {
				button = 'right';	
			}
		}
		
		button = 'mouse'+button;
		
		//register mouse action
		if(re.c('pressed')._pressed){
			re.c('pressed')._pressed[button] = (e.type == 'mousedown');
		}
		
		if(re.c('pressed').preventDefault){
			if(re.c('pressed').preventDefault[button]){
				e.preventDefault();	
			}
		}
		
		re.c('mouse').mouseEvent(e);
	},
	
	/*
	FUTURE
	-add all event listeners
	-add mouse position
	-right click etc..
	-do something about prevent default
	-do something about pressed function
	*/
	mouseEvent:function(e){
		
		//calculate mouse coordinate
		var x;
		var y;
		
		if(e.pageX || e.pageY){
			x = e.pageX;
			y = e.pageY;
		} else {
			x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
			y = e.clientY +	document.body.scrollTop + document.documentElement.scrollTop;
		}
		
		if(re.system.canvas){
			x -= re.system.canvas.offsetLeft;
			y -= re.system.canvas.offsetTop;
		}
		
		//ignore if off canvas
		if(x < 0 || y < 0 || y > re.system.size.y || x > re.system.size.x){
			return;	
		}
		
		var that = re.c('mouse');
		
		for(var i in that.listeners){
			that.listeners[i].signal(e.type, x, y, e);
		}
		
	}
	
})
.run(function(){
	//add event listeners
	
	var targ = window.addEventListener ? window : document;
	
	targ.addEventListener('mousedown', this.mouseAction, false);
	targ.addEventListener('mouseup', this.mouseAction, false);
	targ.addEventListener('mousemove', this.mouseEvent, false);
	targ.addEventListener('click', this.mouseEvent, false);
	targ.addEventListener('dblclick', this.mouseEvent, false);
	targ.addEventListener('contextmenu', this.mouseEvent, false);
	
})
.init(function(c){
	//add to listener array
	
	c.listeners.push(this);
})
.dispose(function(c){
	//remove from listener array
	
	c.listeners.splice(c.listeners.indexOf(this), 1);
})