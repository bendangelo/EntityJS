/*
The mouse component allows an entity to listen to mouse triggers.

@usage
re.e('mouse')
.on('mousedown:middle', function(x, y){
  x = re.screen.toScreenX(x)
  y = re.screen.toScreenY(y)
  //or
  m = re.screen.toScreen(x, y)
  
})
*/
re.c('mouse')
.statics({
	l:[],
	
	pressed:function(e){
		var b, c;
		
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
		
		c = 'mouse:'+b;
		
		//register mouse action
		if(re.c('pressed')._pressed){
			re.c('pressed')._pressed[c] = (e.type == 'mousedown');
		}
    
		re.c('mouse').event(e, c);
		
	},
	
	event:function(e, extra){
		
		//calculate mouse coordinate
		var x;
		var y;
		
		if(e.pageX){
			x = e.pageX;
			y = e.pageY;
		} else {
			x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
			y = e.clientY +	document.body.scrollTop + document.documentElement.scrollTop;
		}
		
		//FUTURE fix, does not support multiple canvases
		x -= re.sys.canvas.offsetLeft;
		y -= re.sys.canvas.offsetTop;
		
		//ignore if off canvas
		if(x < 0 || y < 0 || y > re.sys.sizeY || x > re.sys.sizeX){
			return;
		}
		
		var that = re.c('mouse');
		
		//FUTURE automatically transform screen coordinates?
		var c, t, sx, sy;
		for(var i=0, l = that.l.length; i<l; i++){
			t = that.l[i];
			t.trigger(e.type, {x:x, y:y}, e);
      if(extra){
  			t.trigger(e.type+':'+extra, {x:x, y:y}, e);
      }
		}
		
	},
	
	i:function(){
		re.listener('mousedown', this.pressed, false);
		re.listener('mouseup', this.pressed, false);
		re.listener('mousemove', this.event, false);
		re.listener('click', this.event, false);
		re.listener('dblclick', this.event, false);
		re.listener('contextmenu', this.event, false);
	}
	
})
.init(function(c){
	//add to listener array
	c.l.push(this);
})
.dispose(function(c){
	//remove from listener array
	
	c.l.splice(c.l.indexOf(this), 1);
});