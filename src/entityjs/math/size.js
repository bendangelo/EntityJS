/*

FUTURE-
create bounding component to create an interface for both components.
*/
re.c('size')
.require('point')
.define({
	
	/*
	checks if the two targets intersect with each other.
	
	k.touches(x, y, width, height);
	k.touches(pos, size);
	
	*/
	touches:function(x, y, w, h){
		return !
		(
		x > this.pos.x + this.size.x ||
		x + w < this.pos.x ||
		y > this.pos.y + this.size.y ||
		y + h < this.pos.y
		);
	},
	
	/*
	Calculates the distance between an other two points or from the given points
	re('#point1').distanceTo(re('#point2').pos);
	
	re('#point1').distanceTo(re.e('size').centerPos);
	
	//TODO not centered
	*/
	distanceTo:function(pos){
		
		var kx, ky;
		kx = pos.x-this.pos.x>>31;
		ky = pos.y-this.pos.y>>31;
		
		return Math.round(((xt-this.pos.x ^kx)-kx)+((yt-this.pos.y^ky)-ky));
	}
	
})
.init(function(){
	if(!this.size)
	this.size = {x:40, y:40};
	
})