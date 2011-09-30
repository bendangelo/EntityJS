/*
The bind component prevents points from going outside of the set parameters.

This can be useful for maps, characters, enemies, boxes etc..

re.e('bind bitmap char.png')
.bind = {min:{x:0, y:0}, max:{x:100, y: 10}};

*/

re.c('bind')
.require('point update')
.namespace({
	
	update:function(){
		
		if(this.pos.x < this.bind.min.x){
			this.pos.x = this.bind.min.x;
			
		} else if(this.pos.x > this.bind.max.x){
		
			this.pos.x = this.bind.max.x;	
		}
		
		if(this.pos.y < this.bind.min.y){
			this.pos.y = this.bind.min.y;
			
		} else if(this.pos.y > this.bind.max.y){
		
			this.pos.y = this.bind.max.y;	
		}
		
	}
	
})
.init(function(){
	
	this.bind = {
		min:{x:0, y:0},
		max:{x:10, y:10}
	};
	
	this.signal('update', this.bind_update);
	
})
.dispose(function(){
	
	this.signal('-update', this.bind_update);
	
});