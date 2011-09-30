/*
The bar component draws two horizontal bars. Useful for preloading or displaying a health bar.
*/
re.c('bar')
.require('draw')
.init(function(){

	this.pos = {x:0, y: 0};
	this.size = {x:0, y:40, max:{x:150, y:40}};
	
	this.signal('draw', this.bar_draw);
	
})
.define({
	
	botColor:'#82d5f4',
	topColor:'#25acdf'
	
})
.namespace({

	draw:function(c){
		
		c.fillStyle = this.botColor;
		c.fillRect(-this.reg.x, -this.reg.y, this.size.max.x, this.size.max.y);
		
		c.fillStyle = this.topColor;
		c.fillRect(-this.reg.x, -this.reg.y, this.size.x, this.size.y);
		
	}
	
});