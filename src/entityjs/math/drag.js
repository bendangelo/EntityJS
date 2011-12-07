/*
The drag component adds functions to move points
in relation to its starting postion.
*/
re.c('drag')
.inherit({
	posX:0,
	posY:0,
	
	dragX:0,
	dragY:0,
	
	dragging:false
})
.extend({
	
	startDrag:function(x, y){
		if(!this.dragging){
			this.dragging = true;
			this.dragX = x;
			this.dragY = y;
		}
	},
	
	endDrag:function(){
		this.dragging = false;
	},
	
	updateDrag:function(x, y){
		if(this.dragging){
			this.posX += x - this.dragX;
			this.posY += y - this.dragY;
			
			this.dragX = x;
			this.dragY = y;
		}
	}
	
});