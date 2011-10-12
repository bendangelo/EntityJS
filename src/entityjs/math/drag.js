/*
The drag component adds functions to move points
in relation to its starting postion.
*/
re.c('drag')
.inherit({
	posX:0,
	posY:0
})
.init(function(){
	this.drag_pos = {x:0, y:0};
})
.extend({
	
	anchorDrag:function(x, y){
		this.drag_pos.x = x;
		this.drag_pos.y = y;
	},
	
	updateDrag:function(x, y){
		this.posX += x - this.drag_pos.x;
		this.posY += y - this.drag_pos.y;
		
		this.drag_pos.x = x;
		this.drag_pos.y = y;
	}
	
});