re.c('sprimate')
.require('sprite update')
.namespace({
	animating:'',
	
	stop:function(){
		if(this.animating()){
		
			this.sprimate_animating = '';
			this.signal('sprimated');
			
			this.frame.x = this.sprimate_old.x;
			this.frame.y = this.sprimate_old.y;
			
			this.signal('-update', this.sprimate_update);
		}
		return this;
	},
	
	update:function(t){
		
		var c = this.sprimate_reel;
		
		this.sprimate_tick++;
		
		if(this.sprimate_tick >= c.duration){
			
			this.sprimate_tick = 0;
			
			//check if over
			if(this.sprimate_frame == this.sprimate_reel.frames.length){
				
				if(c.loops == 0 || --this.sprimate_loops >= 1){
					//loop again
					
					this.sprimate_frame = 0;
					
				} else {
					//done animating
					
					this.sprimate_stop();
				
					return;
				}
			}
			
			//move a frame
			this.setFrameId(c.frames[this.sprimate_frame]);
			
			//TODO make delta time safe
			this.sprimate_frame++;
		}
		
	}
	
})
.init(function(){
	
	this.sprimate_reels = {};
	this.sprimate_old = {};
	this.sprimate_reel = {};
	
})
.define({
	
	/*
	The animate method either creates or plays an animation.
	Time is in milliseconds.
	
	//create sequence animation
	re('#player').sprimate('die', 1, 200, [0, 1, 3, 3, 4, 3, 2, 1]);
	
	//play animation
	//can customize the animation for this call.
	re('#player').sprimate('die', 0, 200);
	
	//stop animating
	re('#player').sprimate();
	
	FUTURE: 
	-allow backward animations
	-allow entry of an array of frames. So each counter will go to the next frame in the array
	*/
	sprimate:function(id, loops, duration, frames){
		
		if(arguments.length == 0){
			//stop animating
			return this.sprimate_stop();
		}
		
		if(id == this.sprimate_animating) return;
		
		if(typeof frames == 'string') frames = frames.split(' ');
		
		if(!this.sprimate_reels[id]){
			//define new animation	
			
			this.sprimate_reels[id] = {
				frames:frames,
				duration:duration,
				loops:loops
			};
			
		} else {
			
			if(!this.sprimate_reels[id]){
				return this;	
			}
			
			//defaults
			
			//startX = loops, endX = duration in seconds
			//if startX equals 0, animation loops forever
			
			var r = this.sprimate_reels[id];
			
			//create new reel based on custom attributes
			var c = this.sprimate_reel;
			//copy from saved animation or newly given
			c.loops = (isNaN(loops))? r.loops : loops;
			c.duration = (isNaN(duration))? r.duration : duration;
			c.frames = (typeof frames == 'object')? frames : r.frames;
			
			//setup counter for loops
			this.sprimate_loops = c.loops;
			
			c.duration = Math.ceil(c.duration / c.frames.length);
			
			//save old frames for upon completion
			
			this.sprimate_old.x = this.frame.x;
			this.sprimate_old.y = this.frame.y;
			
			this.sprimate_mpf = 1000 / c.frames.length;
			this.sprimate_frame = 0;
			this.sprimate_tick = 0;
			
			//update frame then run
			this.setFrameId(c.frames[this.sprimate_frame++]);
			
			if(!this.animating()){
				this.signal('update', this.sprimate_update);
			}
			
			this.sprimate_animating = id;
			
		}
		
		return this;
	},
	
	animating:function(id){
		if(id){
			return this.sprimate_animating == id;	
		}
		
		return this.sprimate_animating != '';	
	}
	
});