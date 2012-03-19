/*
The drag component adds functions to move points
in relation to its starting postion.
*/
re.c('drag')
.defaults({
	posX:0,
	posY:0,
	
	dragX:0,
	dragY:0,
	
	dragging:false
})
.defines({
	
	dragStart:function(x, y){
		if(!this.dragging){
			this.dragging = true;
			this.dragX = x;
			this.dragY = y;
      this.trigger('drag:start');
		}
    return this;
	},
	
	dragFinish:function(){
		this.dragging = false;
    return this.trigger('drag:finish');
	},
	
	dragUpdate:function(x, y){
		if(this.dragging){
			this.posX += x - this.dragX;
			this.posY += y - this.dragY;
			
			this.dragX = x;
			this.dragY = y;
      
      this.trigger('drag:update');
		}
    return this;
	}
	
});