/*
The update component calls update signals to all listening entities.
*/
re.c('update')
.static({
	listeners:[],
	ticks:0,
	
	update:function(){
		var that = re.c('update');
		
		for(var k in that.listeners){
			that.listeners[k].signal('update', that.ticks);	
		}
		
		that.ticks++;
	}
})
.define({
	_active:true,
	active:function(value){
		if(arguments.length){
			this._active = value;	
			return this;
		}
		
		return this._active;
	}
})
.init(function(){
	re.c('update').listeners.push(this);
})
.dispose(function(){
	
	re.c('update').listeners.splice(re.c('update').listeners.indexOf(this), 1);
});