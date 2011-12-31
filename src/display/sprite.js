/*
The sprite object extends a drawable image for an entity.
*/

re.c('sprite')
.require('bitmap bisect')
.defaults({
	
	frameX:0,
	frameY:0
	
})
.extend({
	
	setFrameId:function(id){
		this.frameX = this.biToXt(id);
		this.frameY = this.biToYt(id);
		
		return this;
	},
	
	getFrameId:function(){
		return this.toBi(this.frameX, this.frameY);
	},
	
	draw:function(c){
		c.drawImage(this.bitmap, this.frameX * this.sizeX, this.frameY * this.sizeY, this.sizeX, this.sizeY, -this.regX, -this.regY, this.sizeX, this.sizeY);
		
		return this;
	},
	
	//implement for flicker
	flick:function(c){
		this.setFrameId(c);
	}
	
});