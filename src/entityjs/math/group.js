re.c('group')
.require('point')
.define({
	
	/*
	Overwrite old screen functions
	*/
	getScreenX:function(){
		var x = this.pos.x;
		if(this.group) x += this.group.pos.x;
		if(this.screen) x += this.screen.pos.x;
		return x;
	},
	
	getScreenY:function(){
		var y = this.pos.y;
		if(this.group) y += this.group.pos.y;
		if(this.screen) y += this.screen.pos.y;
		return y;
	},
	
	/*group:null,*/
	
	getGroupX:function(){
		var x = this.pos.x;
		if(this.group){
			x += this.group.pos.x;
		}
		return x;
	},
	
	getGroupY:function(){
		var y = this.pos.y;
		if(this.group){
			y += this.group.pos.y;
		}
		return y;
	},
	
	setGroupX:function(x){
	
	},
	
	setGroupY:function(y){
	
	}
	
});