/*
The tick component creates timed events given the set rate.
This is useful for creating delays and animated loops.
The difference between tick and interval, is tick uses the global interval for ticking.

TODO: not finished
*/
re.comp('tick')
.default({
	ticks:0,
	paused:false,
	_intervalId: null,
	_interval:50,
	_onTick:null,
	
	start: function(onTick){
		paused = false;
		
		//remember past tick functions
		if(onTick){
			this._onTick = onTick;
		}
		
		var that = this;
		this._intervalId = setInterval(function(){
			that.ticks++;
			that._onTick.call(that);
		}, this._interval);
	},
	
	stop: function(){
		if(this._intervalId) clearInterval(this._intervalId);
		paused = true;
	},
	
	fps:function(value){
		if(value){
			this._interval = 1000/value;
		
			return this;
			
		}
		return 1000 / this._interval;
	}
	
	
});