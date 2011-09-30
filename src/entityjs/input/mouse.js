re.c('mouse')
.global({
	listeners:[],
	
	mouseAction:function(e){
		var b;
		
		//find which key
		if(e.which == null){
			//IE
			if(e.button < 2){
				b = 'left';	
			} else if(e.button == 4){
				b = 'middle';
			} else {
				b = 'right';	
			}
		} else {
			if(e.which < 2){
				b = 'left';	
			} else if(e.which == 2){
				b = 'middle';	
			} else {
				b = 'right';	
			}
		}
		
		b = 'mouse:'+b;
		
		//register mouse action
		if(re.c('pressed')._pressed){
			re.c('pressed')._pressed[b] = (e.type == 'mousedown');
		}
		
		if(re.c('pressed').preventDefault){
			if(re.c('pressed').preventDefault[b]){
			if(e.preventDefault)
				e.preventDefault();
			 else 
				e.returnValue = false;
			}
		}
		
		re.c('mouse').mouseEvent(e);
	},
	
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
		
		if(re.sys.canvas){
			x -= re.sys.canvas.offsetLeft;
			y -= re.sys.canvas.offsetTop;
		}
		
		//ignore if off canvas
		if(x < 0 || y < 0 || y > re.sys.size.y || x > re.sys.size.x){
			return;	
		}
		
		var that = re.c('mouse');
		
		for(var i=0; i<that.listeners.length; i++){
			that.listeners[i].signal(e.type, x, y, e);
		}
		
	},
	
	active:false,
	initMouse:function(){
		if(!this.active){
			this.active = true;
			
			re.listener('mousedown', this.mouseAction, false);
			re.listener('mouseup', this.mouseAction, false);
			re.listener('mousemove', this.mouseEvent, false);
			re.listener('click', this.mouseEvent, false);
			re.listener('dblclick', this.mouseEvent, false);
			re.listener('contextmenu', this.mouseEvent, false);
		}
	}
	
})
.init(function(c){
	//add to listener array
	c.initMouse();
	c.listeners.push(this);
})
.dispose(function(c){
	//remove from listener array
	
	c.listeners.splice(c.listeners.indexOf(this), 1);
});