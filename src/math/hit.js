re.c('hit')
.defaults({
	
	posX:0,
	posY:0,
	
	sizeX:1,
	sizeY:1,
	
	/*
	checks if the two targets intersect with each other.
	
	k.hit(x, y, width, height);
	k.hit(entity);
  
	*/
	hit:function(x, y, w, h){
    if(re.is(x, 'object')){
      y = x.posY || x.y;
      w = x.sizeX || x.w;
      h = x.sizeY || x.h;
      x = x.posX || x.x;
    }
    
		return !
		(
		x > this.posX + this.sizeX ||
		x + w < this.posX ||
		y > this.posY + this.sizeY ||
		y + h < this.posY
		);
	}
	
});