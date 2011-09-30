/*
The position component contains helper methods for positioning entities relative to system size.
*/
re.c('position')
.require('point')
.define({
	
	centerX:function(o){
		o = o || 0;
		this.pos.x = Math.floor(re.sys.size.x * 0.5 - this.size.x * 0.5 + o);
		
		return this;
	},
	
	centerY:function(o){
		o = o || 0;
		this.pos.y = Math.floor(re.sys.size.y * 0.5 - this.size.y * 0.5 + o);
		return this;
	},
	
	right:function(x){
		x = x || 0;
		this.pos.x = Math.floor(re.sys.size.x - this.size.x + x);
		return this;
	},
	
	left:function(x){
		x = x || 0;
		this.pos.x = Math.floor(x);
		return this;
	},
	
	top:function(y){
		y = y || 0;
		this.pos.y = Math.floor(y);
		return this;
	},
	
	bottom:function(y){
		y = y || 0;
		this.pos.y = Math.floor(re.sys.size.y - this.size.y + y);
		return this;
	}
	
})
.init(function(){
	
	if(!this.size)
		this.size = {x:0, y:0};
	
});