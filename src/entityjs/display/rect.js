/*
The rect component draws a rectangle on screen.
*/
re.c('rect')
.require('draw')
.inherit({
	color:'#82d5f4'
})
.extend({
	
	draw:function(c){
		
		c.fillStyle = this.color;
		
		c.fillRect(-this.regX, -this.regY, this.sizeX, this.sizeY);
		
	}
	
});