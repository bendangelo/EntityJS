/*
The flicker component calls the implemented method and sends the given information over a period of time.

This is most popular for sprite animation.

It can also be used for graduatly writing text or flashing a drawing object.
*/
re.c('flicker')
.requires('update timestep')
.interfaces('flick')
.init(function(){
	
	this.flicker_reels = {};
	this.flicker_old = {};
	this.flicker_reel = {};
	
	this.flicker_flickering = '';
	
})
.defines({
	
	flicker_stop:function(){
		var o = this.flicker_flickering;
		this.flicker_flickering = '';
			
		this.stepProgress = 0;
			
		this.off('update', this.flicker_update);
    
		return this.trigger('flicker:finish', o);
	},
	
	flicker_update:function(t){
		
		this.timestep(t, function(){
			var c = this.flicker_reel;
      
			//check if over
			if(this.flicker_frame == this.flicker_reel.frames.length){
				
				if(c.loops == -1 || --this.flicker_loops >= 1){
					//loop again
					
					this.flicker_frame = 0;
					
				} else {
					//done flickering
					
					this.flicker_stop();
					
					return;
				}
			}
			
			//flick
			if(this.flick(c.frames[this.flicker_frame++], this.flicker_flickering, this.flicker_loops) === false){
        //stop
        this.flicker();
      }
			
		});
		
	},
	
	addFlicker:function(id, loops, duration, frames){
	
		if(re.is(id, 'object')){
			
			for(var i in id){
					
					//copy formed array and insert
					var c = id[i].slice();
					//add key into array
					c.unshift(i);
					
					this.addFlicker.apply(this, c);
					
			}
			
			return this;
		}
		
		if(re.is(frames, 'string')) frames = frames.split(' ');
		
		//add
		this.flicker_reels[id] = 
		{
			frames:frames,
			duration:duration,
			loops:loops
		};
		
		return this;
	},
	
	removeFlicker:function(id){
		
		if(re.is(id,'object')){
			
			for(var i in id){
				
				this.removeFlicker.call(this, id[i]);
			}
			
			return this;
		}
		
		//assuming this flicker isn't running
		delete this.flicker_reels[id];
		
		return this;
	},
	
	/*
	The animate method either creates or plays an animation.
	Time is in milliseconds.
	
	//create sequence animation
	re('#player')[0].flicker('die', 1, 200, [0, 1, 3, 3, 4, 3, 2, 1]);
	
	//play animation
	//can customize the animation for this call.
	re('#player')[0].flicker('die', 0, 200);
	
	//stop flickering
	re('#player')[0].flicker();
	
	//add multiple animations
	flicker({
	idle:[loops, duration, frames],
	..
	
	
	});
	
	FUTURE: 
	-allow backward animations
	-allow entry of an array of frames. So each counter will go to the next frame in the array
	*/
	flicker:function(id, loops, duration, frames){
		
		if(!re.is(id) && this.flickering()){
			//stop flickering
			return this.flicker_stop();
		}
		
		if(id == this.flicker_flickering) return;
		
		if(!this.flicker_reels[id]){
			return this;	
		}
		
		//defaults
		
		//startX = loops, endX = duration in seconds
		//if startX equals 0, animation loops forever
		
		var r = this.flicker_reels[id];
		
		//create new reel based on custom attributes
		var c = this.flicker_reel;
		//copy from saved animation or newly given
		c.loops = (isNaN(loops))? r.loops : loops;
		c.duration = (isNaN(duration))? r.duration : duration;
    
    //convert to seconds
    if(c.duration >= 30){
      c.duration /= 1000;
    }
    
		c.frames = (re.is(frames,'array'))? frames : r.frames;
		
		//setup counter for loops
		this.flicker_loops = c.loops;
		
		this.stepProgress = 0;
		this.stepSize = c.duration / (re.sys.stepSize * 60);
    
		this.flicker_frame = 0;
		
		//update frame then run
		//this.flick(c.frames[this.flicker_frame++]);
		
		if(!this.flickering()){
			this.on('update', this.flicker_update);
		}
		
    //sets flicker status
		this.flicker_flickering = id;
		
		return this.trigger('flicker:start');
	},
	
	/*
	Check if flicker is running / compare current.
	
	this.flickering(); // returns current flicker name
	this.flickering('idle'); // false
	*/
	flickering:function(id){
		if(id){
			return this.flicker_flickering == id;	
		}
		
		return this.flicker_flickering;
	}
	
});