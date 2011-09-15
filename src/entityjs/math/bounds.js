/*
The bounds component prevents entities from going outside of the set parameters.

This can be useful for maps, characters, enemies, boxes etc..

re.e('bounds bitmap char.png')
.bounds = {min:{x:0, y:0}, max:{x:100, y: 10}};

*/

re.c('bounds')
.require('point update')
.init(function(){
	
	this.bounds = {
		min:{x:0, y:0},
		max:{x:10, y:10}
	};
	
	this.signal('update', function(){
		
		
		if(this.pos.x > this.bounds.min.x){
			this.pos.x = this.bounds.min.x;	
		}
		
		if(this.pos.y > this.bounds.min.y){
			this.pos.y = this.bounds.min.y;
		}
		
		
		if(this.pos.x < -this.bounds.max.x + re.sys.size.x){
			this.pos.x = -this.bounds.max.x + re.sys.size.x;	
		}
		
		if(this.pos.y < -this.bounds.max.y + re.sys.size.y){
			this.pos.y = -this.bounds.max.y + re.sys.size.y;	
		}
		
	});
	
});