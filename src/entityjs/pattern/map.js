/*
The map component creates an auto expandable two-dimensional array.
*/
re.c('map')
.define({
	value:0,
	map:null,
	size:null,
	
	add:function(x, y, value){
	
		if(arguments.length == 3){
			
			//increate y length
			while(y >= this.map.length){
				var m = new Array(this.map[0]);
				
				for(var l in m){
					m[l] = this.value;
				}
				
				this.map.push(m);
				
			}
			
			//increase x length
			while(x >= this.map[this.map.length-1].length){
				
				for(var k=0; k<this.map.length; k++){
					this.map[k].push(this.value);
				}
				
			}
			
			this.size.x = this.map[y].length;
			this.size.y = this.map.length;
			
			this.map[y][x] = value;
			
			return this;
		}
		
		return this.map[y][x];
	},
	
	within:function(x, y){
		
		if(y < 0 || y >= this.size.y || x < 0 || x >= this.size.x){
			return false;
		}
		return true;
	},
	
	get:function(x, y){
		if(this.within(x,y)){
			return this.map[y][x];
		}
		return null;
	}
	
})
.init(function(){
	this.size = {x:0, y:0};
	this.map = [];
});