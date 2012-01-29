re.c('mouse')
.statics({
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
		
		var c = false;
		
		re.c('mouse').mouseEvent(e);
		
		if(c) return false;
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
		
		//FUTURE fix, does not support multiple canvases
		if(re.sys.canvas){
			x -= re.sys.canvas.offsetLeft;
			y -= re.sys.canvas.offsetTop;
		}
		
		//ignore if off canvas
		if(x < 0 || y < 0 || y > re.sys.sizeY || x > re.sys.sizeX){
			return;
		}
		
		var that = re.c('mouse');
		
		//FUTURE automatically transform screen coordinates?
		var c, t, sx, sy;
		for(var i=0, l = that.listeners.length; i<l; i++){
			t = that.listeners[i];
			if(t.toScreen && t.screen){
				sx = t.screen.toScreenX(x);
				sy = t.screen.toScreenY(y);
			} else {
				sx = x;
				sy = y;
			}
			t.trigger(e.type, sx, sy, e);
		}
		
	},
	
	active:false,
	initListeners:function(){
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
.defaults({
	toScreen:false
})
.init(function(c){
	//add to listener array
	c.initListeners();
	c.listeners.push(this);
})
.dispose(function(c){
	//remove from listener array
	
	c.listeners.splice(c.listeners.indexOf(this), 1);
});