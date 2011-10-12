/*
The circle component draws a rectangle on screen.
*/
re.c('circle')
.require('draw')
.inherit({
	color:'#82d5f4'
})
.extend({
	
	draw:function(c){
		
		c.fillStyle = this.color;
		
		c.beginPath();
		
			c.arc(-this.regX, -this.regY, this.sizeX, 0, Math.PI*2, true);
		
		c.closePath();
		
		c.fill();
		
	},
	
	setRadius:function(r){
		this.sizeX = this.sizeY = r;
		return this;
	}
	
});