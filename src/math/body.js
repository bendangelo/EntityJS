/*
The body component replaces the hittest component for
a more precise hit test.

It also removes the usage of sizeX and sizeX for collision
boundaries.

@usage

re.e('body player.png')
.attr({
bodyX:40,
bodyY:40,
padX:2 //pushes the body in 2 pixels on both right and left
})
.touches(0, 0, 40, 40) //touches random thing?
.touchesBody(0, 0, 40, 40, 2, 2) //touches another body?

*/
re.c('body')
.defines({
	
	hit:function(x, y, w, h){
    if(re.is(x,'object')){
      y = x.posY;
      w = x.sizeX;
      h = x.sizeY;
      x = x.posX;
    }
		return !
		(
		x > this.posX + this.bodyX - this.padX  ||
		x + w < this.posX + this.padX ||
		y > this.posY + this.bodyY - this.padY||
		y + h < this.posY + this.padY
		);
	},
	
	hitBody:function(x, y, bx, by, px, py){
    if(re.is(x,'object')){
      y = x.posY;
      bx = x.bodyX;
      by = x.bodyY;
      px = x.padX;
      py = x.padY;
      x = x.posX;
    }
		return !
		(
		x + px > this.posX + this.bodyX + this.padX ||
		x + bx - px < this.posX + this.padX ||
		y + py > this.posY + this.bodyY - this.padY ||
		y + by - py < this.posY + this.padY
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