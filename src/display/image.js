/*
The image component draws an image on screen.


FUTURE - add bitdata component for image manipulation.
*/
re.c('image')
.requires('draw')
.defines({
	
	image:function(b){
    if(re.is(b)){
      this.attr({_image:b, sizeX:b.width, sizeY:b.height});
  		return this;
    }
    return this._image;
	},
	
	visible:function(){
		return this._image && this.parent('draw', 'visible');
	},
	
	draw:function(c){
		c.drawImage(this._image, -this.regX, -this.regY, this.sizeX, this.sizeY);
		return this;
	}
	
})
.init(function(){
	
	if(this._image){
		this.image(this._image);
	}
	
});