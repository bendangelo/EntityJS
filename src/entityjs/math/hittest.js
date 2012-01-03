re.c('hittest')
.defaults({
	
	posX:0,
	posY:0,
	
	sizeX:0,
	sizeY:0,
	
	/*
	checks if the two targets intersect with each other.
	
	k.touches(x, y, width, height);
	
	*/
	touches:function(x, y, w, h){
		return !
		(
		x > this.posX + this.sizeX ||
		x + w < this.posX ||
		y > this.posY + this.sizeY ||
		y + h < this.posY
		);
	}
	
});