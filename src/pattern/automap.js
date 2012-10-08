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

//reference copy
map.automap(level)

map.automap(0, 1) // 1

//value copy
map.automap(level, true)

map.map == level //true

//length
map.lenX
map.lenY

*/
re.c('automap')
.defaults({
	lenX:0,
	lenY:0,
	automapDefault:0
})
.defines({
	
	automap:function(x, y, value){
    if(re.is(x, 'array')){
      
      if(y){
        
        //deep copy
        for(var y=0; y<x.length; y++){
			   for(var k=0; k<x[0].length; k++){
				   this.automap(k, y, x[y][k]);
			    }
		    }
        
      } else {
    		
        //non-deep copy
		  
		    this._automap = x;
		
    		if(x.length > 0){
    			this.lenX = x[0].length;
    		} else {
    			this.lenX = 0;
    		}
    		
    		this.lenY = x.length;
      }
      
      return this;  
    }
    
    if(!re.is(value)){
        if(this.within(x,y)){
            return this._automap[y][x];
        }
        return null;
    }
    
			//increate y length
			while(y >= this._automap.length){
				var m = new Array(this._automap[0]);
				
				for(var l in m){
					m[l] = this.automapDefault;
				}
				
				this._automap.push(m);
				
			}
			
			//increase x length
			while(x >= this._automap[this._automap.length-1].length){
				
				for(var k=0; k<this._automap.length; k++){
          if(this._automap[k].length <= x){
  					this._automap[k].push(this.automapDefault);
          }
				}
				
			}
			
			this.lenX = this._automap[y].length;
			this.lenY = this._automap.length;
			
			this._automap[y][x] = value;
			
			return this;
	},
	
	within:function(x, y){
		return y >= 0 && y < this.lenY && x >= 0 && x < this.lenX;
	}
	
})
.init(function(){
	this._automap = [];
});