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
	hit:function(x, y, w, h, rx, ry){
    if(re.is(x, 'object')){
      y = x.posY || x.y;
      w = x.sizeX || x.w;
      h = x.sizeY || x.h;
      rx = x.regX || 0;
			ry = x.regY || 0;
      x = x.posX || x.x;
    }

    rx = rx || 0;
    ry = ry || 0;
    var regX = this.regX || 0;
    var regY = this.regY || 0;

		return !
		(
		x - rx > this.posX + this.sizeX - regX ||
		x + w - rx < this.posX - regX ||
		y -ry > this.posY + this.sizeY - regY ||
		y + h - ry < this.posY - regY
		);
	}
	
});