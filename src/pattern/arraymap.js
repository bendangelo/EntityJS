/*
The arraymap component creates an auto expandable two-dimensional array.
*/
re.c('arraymap')
.defaults({
	lengthX:0,
	lengthY:0
})
.extend({
	value:0,
	
	set:function(x, y, value){
			
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
			
			this.lengthX = this.map[y].length;
			this.lengthY = this.map.length;
			
			this.map[y][x] = value;
			
			return this;
	},
	
	within:function(x, y){
		
		if(y < 0 || y >= this.lengthY || x < 0 || x >= this.lengthX){
			return false;
		}
		return true;
	},
	
	get:function(x, y){
		if(this.within(x,y)){
			return this.map[y][x];
		}
		return null;
	},
	
	copy:function(a){
		
		for(var y=0; y<a.length; y++){
			for(var x=0; x<a[0].length; x++){
				this.set(x, y, a[y][x]);
			}
		}
		
		return this;
	},
	
	copyByRef:function(m){
		
		this.map = m;
		
		if(m.length > 0){
			this.lengthX = m[0].length;
		} else {
			this.lengthX = 0;
		}
		
		this.lengthY = m.length;
		
		return this;
	}
	
})
.init(function(){
	this.map = [];
});