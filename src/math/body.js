/*
The body component replaces the hittest component for
a more precise hit test.

It also removes the usage of sizeX and sizeX for collision
boundaries.

@usage

re.e('body player.png')
.set({
bodyX:40,
bodyY:40,
padX:2 //pushes the body in 2 pixels on both right and left
})
.touches(0, 0, 40, 40) //touches random thing?
.touchesBody(0, 0, 40, 40, 2, 2) //touches another body?

*/
re.c('body')
.defines({
	
	hit:function(x, y, w, h, rx, ry){
    if(re.is(x,'object')){
      y = x.posY || x.y;
      w = x.sizeX || x.w;
      h = x.sizeY || x.h;
      rx = x.regX || 0;
      ry = x.regY || 0;
      x = x.posX || x.x;
    }
    
    rx = rx || 0;
    ry = ry || 0;
    
    var regX = this.regX ||0;
    var regY = this.regY ||0;
    
		return !
		(
		x - rx > this.posX + this.bodyX - this.padX - regX  ||
		x + w -rx < this.posX + this.padX - regX ||
		y -ry > this.posY + this.bodyY - this.padY - regY ||
		y + h - ry < this.posY + this.padY - regY
		);
	},
	
	hitBody:function(x, y, bx, by, px, py, rx, ry){
    if(re.is(x,'object')){
      y = x.posY || x.y;
      bx = x.bodyX;
      by = x.bodyY;
      px = x.padX;
      py = x.padY;
      rx = x.regX || 0;
      ry = x.regY || 0;
      x = x.posX || x.x;
    }
    
    rx = rx || 0;
    ry = ry || 0;
    
    var regX = this.regX ||0;
    var regY = this.regY ||0;
    
    
		return !
		(
		x + px - rx> this.posX + this.bodyX + this.padX -regX ||
		x + bx - px -rx < this.posX + this.padX -regX ||
		y + py -ry > this.posY + this.bodyY - this.padY - regY ||
		y + by - py -ry < this.posY + this.padY - regY
		);
	}
	
	
})
.defaults({
	
  posX:0,
  posY:0,
  
	padX:0,
	padY:0,
	
	bodyX:1,
	bodyY:1
	
});