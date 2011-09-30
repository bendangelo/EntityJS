/*
The point component defines an entity that has a 2d position in space.
This can be used for 2d calculations or most commonly 2d sprite positioning.

*/

re.c('point')
.init(function(){
	
	if(!this.pos)
	this.pos = {x:0, y:0};
	
})
.define({
	
	moveTo:function(x, y){
		if(arguments.length == 1){
			y = x.y;
			x = x.x;
		}
		
		this.pos.x = x;
		this.pos.y = y;
		
		return this;
	},
	
	distanceTo:function(x, y){
		
	}
	
});