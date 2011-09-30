re.comp('bitmap')
.require('point draw')
.init(function(){
	
	if(!this.size)
		this.size = {x:0, y:0};
	
	if(this.image){
		this.reg.x = this.image.width * 0.5;
		this.reg.y = this.image.height * 0.5;
		this.size.x = this.image.width;
		this.size.y = this.image.height;
	}
	
	this.signal('draw', this.bitmap_draw);
	
})
.dispose(function(){
	
	this.signal('-draw', this.bitmap_draw);
	
})
.namespace({
	
	draw:function(c){
	
		if(this.image && (!this.screen || this.screen.touches(this.pos.x - this.reg.x, this.pos.y - this.reg.y, this.image.width, this.image.height))){
			
			c.drawImage((this.canvasCache)?this.canvasCache:this.image, -this.reg.x, -this.reg.y, this.image.width, this.image.height);
			
		}
		
	}
	
});