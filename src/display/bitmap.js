/*
The bitmap component draws an image on screen.


FUTURE - add bitdata component for image manipulation.
*/
re.c('bitmap')
.require('draw')
.extend({
	
	setBitmap:function(b){
		this.bitmap = b;
		if(b){
			this.sizeX = b.width;
			this.sizeY = b.height;
		}
		return this;
	},
	
	isVisible:function(){
		return this.bitmap && this.parent('draw', 'isVisible');
	},
	
	draw:function(c){
		
		c.drawImage(this.bitmap, -this.regX, -this.regY, this.sizeX, this.sizeY);
		return this;
	}
	
})
.init(function(){
	
	if(this.bitmap){
		this.setBitmap(this.bitmap);
	}
	
});