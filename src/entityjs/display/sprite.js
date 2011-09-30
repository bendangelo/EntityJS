/*
The sprite object defines a drawable image for an entity.
*/

re.c('sprite')
.require('point draw bisect')
.init(function(){
	
	if(!this.frame){
		this.frame = {x:0, y:0};
	}
	
	if(!this.frame.size){
		this.frame.size = {x:40, y:40};
	}
	
	this.signal('draw', this.sprite_draw);
	
})
.dispose(function(){
	
	this.signal('-draw', this.sprite_draw);
	
})
.define({
	
	setFrameId:function(id){
		this.frame.x = this.biToXt(id, this.image.width, this.frame.size.x);
		this.frame.y = this.biToYt(id, this.image.width, this.frame.size.y);
		return this;
	},
	
	getFrameId:function(){
		return this.toBi(this.frame.y, this.frame.x, this.image.width);
	}
	
})
.namespace({
	
	draw:function(c){
		
		if(this.image && (!this.screen || this.screen.touches(this.pos.x - this.reg.x, this.pos.y -this.reg.y, this.frame.size.x, this.frame.size.y))){
			
			c.drawImage((this.canvasCache)?this.canvasCache:this.image, this.frame.x * this.frame.size.x, this.frame.y * this.frame.size.y, this.frame.size.x, this.frame.size.y, -this.reg.x,  -this.reg.y, this.frame.size.x, this.frame.size.y);
			
		}
		
		return this;
	}
	
});