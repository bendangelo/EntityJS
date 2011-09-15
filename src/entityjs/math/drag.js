/*
The drag component adds functions to move points
in relation to its starting postion.
*/
re.c('drag')
.require('point')
.namespace({
	pos:null,
})
.init(function(){
	this.drag_pos = {x:0, y:0};
})
.define({
	
	anchorDrag:function(x, y){
		this.drag_pos.x = x;
		this.drag_pos.y = y;
	},
	
	updateDrag:function(x, y){
		this.pos.x += x - this.drag_pos.x;
		this.pos.y += y - this.drag_pos.y;
		
		this.drag_pos.x = x;
		this.drag_pos.y = y;
	}
	
});