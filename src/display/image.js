/*
The image component draws an image on screen.


FUTURE - add bitdata component for image manipulation.
*/
re.c('image')
.require('draw')
.extend({
	
	setImage:function(b){
		this.image = b;
		if(b){
			this.sizeX = b.width;
			this.sizeY = b.height;
		}
		return this;
	},
	
	isVisible:function(){
		return this.image && this.parent('draw', 'isVisible');
	},
	
	draw:function(c){
		
		c.drawImage(this.image, -this.regX, -this.regY, this.sizeX, this.sizeY);
		return this;
	}
	
})
.init(function(){
	
	if(this.image){
		this.setImage(this.image);
	}
	
});