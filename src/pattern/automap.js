/*
The automap component creates an auto expandable two-dimensional array.

@usage

var map = re.e('automap');

//set
//x = 0, y = 10, value = 10
map.automap(0, 10, 10)

//get
map.automap(0, 10) // 10

var level = 
[
[0,1,2,3,5,5],
[2,3,4,5,6,4]
]

//value copy
map.automap(level)

map.automap(0, 1) // 1

//reference copy
map.automap(level, true)

map.map == level //true

//length
map.lenX
map.lenY

*/
re.c('automap')
.defaults({
	lenX:0,
	lenY:0
})
.defines({
	value:0,
	
	automap:function(x, y, value){
    if(re.is(x, 'array')){
      
      if(y){
        //non-deep copy
		  
		    this.map = x;
		
    		if(x.length > 0){
    			this.lenX = x[0].length;
    		} else {
    			this.lenX = 0;
    		}
    		
    		this.lenY = x.length;
        
      } else {
    		
        //deep copy
        for(var y=0; y<x.length; y++){
			   for(var k=0; k<x[0].length; k++){
				   this.automap(k, y, x[y][k]);
			    }
		    }
      }
      
      return this;  
    }
    
    if(!re.is(value)){
        if(this.within(x,y)){
            return this.map[y][x];
        }
        return null;
    }
    
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
          if(this.map[k].length <= x){
  					this.map[k].push(this.value);
          }
				}
				
			}
			
			this.lenX = this.map[y].length;
			this.lenY = this.map.length;
			
			this.map[y][x] = value;
			
			return this;
	},
	
	within:function(x, y){
		
		if(y < 0 || y >= this.lenY || x < 0 || x >= this.lenX){
			return false;
		}
		return true;
	},
	
	copy:function(a){
		
		return this;
	},
	
	copyByRef:function(m){
		
		
		return this;
	}
	
})
.init(function(){
	this.map = [];
});