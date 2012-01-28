/*
The body component replaces the hittest component for
a more precise touch checking.

*/
re.c('body')
.defines({
	
	touches:function(x, y, w, h){
		return !
		(
		x > this.posX + this.bodX - this.padX  ||
		x + w < this.posX + this.padX ||
		y > this.posY + this.bodY - this.padY||
		y + h < this.posY + this.padY
		);
	},
	
	touchesBody:function(x, y, bx, by, px, py){
		return !
		(
		x + px > this.posX + this.bodX + this.padX ||
		x + bx - px < this.posX + this.padX ||
		y + py > this.posY + this.bodY - this.padY ||
		y + by - py < this.posY + this.padY
		);
	}
	
	
})
.defaults({
	
	padX:0,
	padY:0,
	
	bodX:1,
	bodY:1
	
});