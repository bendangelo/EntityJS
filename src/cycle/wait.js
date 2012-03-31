/*
The wait component delays function calls.

//TODO: fix this comp up
*/
re.c('wait')
.requires('update')
.defines({
	
	wait:function(time, callback){
		var c = 0;
		
		this.on('update',  function(t){
			c += t;
			
			if(c >= time){
				this.callback.apply(this, Array.prototype.slice.call(arguments, 2));
				return false;
			}
		});
		
    return this;
	}
	
});