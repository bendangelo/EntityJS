re.c('group')
.require('point')
.define({
	
	group:null,
	
	groupX:function(){
		var x = this.pos.x;
		if(this.group){
			x += this.group.pos.x;
		}
		return x;
	},
	
	groupY:function(){
		var y = this.pos.y;
		if(this.group){
			y += this.group.pos.y;
		}
		return y;
	}
	
});