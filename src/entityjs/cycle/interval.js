/*
The interval component creates an interval for timed events.

*/
re.comp('interval')
.default({
	ticks:0,
	paused:false,
	_intervalId: null,
	interval:50,
	fps:0,
	_onTick:null,
	
	start: function(fps, onTick){
		
		if(arguments.length == 1){
			this.interval = 1000/fps;
			this.fps = 1000 / this.interval;
		}
		
		paused = false;
		
		//remember past tick functions
		if(arguments.length == 2){
			this._onTick = onTick;
		}
		
		var that = this;
		this._intervalId = setInterval(function(){
			that.ticks++;
			that._onTick.call(that, that.ticks);
		}, this.interval);
		
	},
	
	stop: function(){
		if(this._intervalId) clearInterval(this._intervalId);
		
		paused = true;
	}
	
});