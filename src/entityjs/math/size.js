/*

FUTURE-
create bounding component to create an interface for both components.
*/
re.c('size')
.require('point -radius')
.define({
	
	leftEdge:function(){
		return this.pos.x;
	},
	
	rightEdge:function(){
		return this.pos.x + this.size.x;
	},
	
	bottomEdge:function(){
		return this.pos.y + this.size.y;
	},
	
	topEdge:function(){
		return this.pos.y;
	},
	
	centerX:function(){
		return (this.pos.x + this.size.x) / 2;	
	},
	
	centerY:function(){
		return (this.pos.y + this.size.y) / 2;	
	},
	
	/*
	checks if a the two targets intersect with each other.
	
	k.touches(b);
	k.touches(pos, size);
	
	*/
	touches:function(targ){
		return !
		(
		targ.pos.x > this.pos.x + this.size.x ||
		targ.pos.x + targ.size.x < this.pos.x ||
		targ.pos.y > this.pos.y + this.size.y ||
		targ.pos.y + targ.size.y < this.pos.y
		);
	},
	
	/*
	Calculates the distance between an other two points or from the given points
	
	re('#point').distanceTo(10, 10);
	re('#point1').distanceTo(re('#point2'));
	
	FUTURE - fix
	*/
	distanceTo:function(xt, yt){
		
		if(typeof xt == 'object'){
			//find center
			if(xt.has('size')){
				yt = (xt.pos.y + xt.size.y) / 2;
				xt = (xt.pos.x + xt.size.x) / 2;
			} else {
				//its a circle
				yt = xt.pos.y;
				xt = xt.pos.x;
			}
		}
		
		var kx, ky;
		kx = xt-this.pos.x>>31;
		ky = yt-this.pos.y>>31;
		
		return Math.round(((xt-this.pos.x ^kx)-kx)+((yt-this.pos.y^ky)-ky));
	}
	
})
.init(function(){
	this.size = {x:0, y:0};
})