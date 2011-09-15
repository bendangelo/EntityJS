/*
The point component defines an entity that has a 2d position in space.
This can be used for 2d calculations or most commonly 2d sprite positioning.

*/

re.comp('point')
.init(function(){
	this.pos = {x:0, y:0};
})
.default({
	
	distanceTo:function(x, y){
		
	}
	
});