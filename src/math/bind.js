/*
The bind component prevents points from going outside of the set parameters.

This can be useful for maps, characters, enemies, boxes etc..

re.e('bind bitmap char.png')
.bind = {min:{x:0, y:0}, max:{x:100, y: 10}};

*/

re.c('bind')
.require('update')
.namespace({
	
	update:function(){
		if(!this.bind) return;
		
		if(this.posX < this.bindMinX){
			
			this.posX = this.bindMinX;
			
		} else if(this.posX > this.bindMaxX){
		
			this.posX = this.bindMaxX;	
		}
		
		if(this.posY < this.bindMinY){
			
			this.posY = this.bindMinY;
			
		} else if(this.posY > this.bindMaxY){
		
			this.posY = this.bindMaxY;	
		}
		
	}
	
})
.inherit({
	
	posX:0,
	posY:0,
	
	bindMinX:0,
	bindMinY:0,
	
	bindMaxX:10,
	bindMaxY:10,
	
	bind:true
	
})
.extend({
	
	setBind:function(minx, miny, maxx, maxy){
		
		this.bindMinX = minx;
		this.bindMinY = miny;
		
		this.bindMaxX = maxx;
		this.bindMaxY = maxy;
		
		return this;
	}
	
})
.init(function(){
	
	this.addSignal('update', this.bind_update);
	
})
.dispose(function(){
	
	this.removeSignal('update', this.bind_update);
	
});