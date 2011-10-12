/*
The wait component delays function calls.
*/
re.c('wait')
.require('update')
.extend({
	
	wait:function(time, callback){
		var c = 0;
		
		this.addSignal('update',  function(t){
			c += t;
			
			if(c >= time){
				this.callback.apply(this, Array.prototype.slice.call(arguments, 2));
				return false;
			}
		});
		
	}
	
});