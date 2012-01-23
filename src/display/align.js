/*
The align component contains helper methods for positioning entities relative to system size.
*/
re.c('align')
.require('draw')
.extend({
	
	alignX:function(o){
		o = o || 0;
		this.posX = Math.floor(re.sys.sizeX * 0.5 - this.sizeX * 0.5 + o);
		
		return this;
	},
	
	alignY:function(o){
		o = o || 0;
		this.posY = Math.floor(re.sys.sizeY * 0.5 - this.sizeY * 0.5 + o);
		return this;
	},
	
	alignRight:function(x){
		x = x || 0;
		this.posX = Math.floor(re.sys.sizeX - this.sizeX + x);
		return this;
	},
	
	alignLeft:function(x){
		x = x || 0;
		this.posX = Math.floor(x);
		return this;
	},
	
	alignTop:function(y){
		y = y || 0;
		this.posY = Math.floor(y);
		return this;
	},
	
	alignBottom:function(y){
		y = y || 0;
		this.posY = Math.floor(re.sys.sizeY - this.sizeY + y);
		return this;
	}
	
});