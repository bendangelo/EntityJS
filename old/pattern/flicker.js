/*
The flicker component calls the implemented flick method with the given array data over a period of time.

This is most popular for sprite animation.

It can also be used for graduatly writing text or flashing a drawing object.

re.c('health')
.requires('flicker')
.defines({
  
  health:100,
  flick:function(health){
    this.health += health;
    if(this.health >= 100){
      //stops flicker
      return false;
    }
  },
  
  regen:function(){
    //adds health over a duration of 30 seconds
    this.flicker(30, [5, 5, 5, 5, 5, 5]);
  }

});

var e = re.e('health').set('health', 40);

//low on health, regenerate
e.regen();

*/
re.c('flicker')
.requires('update timestep')
.namespaces({
	flickering:'',
  
	stop:function(){
		var o = this.flicker_id;
		this.flicker_id = '';
			
		this.stepProgress = 0;
			
		this.off('update', this.flicker_update);
    
		return this.trigger('flicker:finish', o);
	},
	
  change:function(){
    
		//check if over
		if(this.flicker_frame == this.flicker_frames.length){
			
			if(this.flicker_loops == -1 || --this.flicker_loops >= 1){
				//loop again
				
				this.flicker_frame = 0;
				
			} else {
				//done flickering
				
				this.flicker_stop();
	  			return;
			}
		}
			
     this.flicker_run();
  },
  
  run:function(){
    
    var f = this.flicker_frame, //frame number
    fs = this.flicker_frames, //array of frames
    l = this.flicker_loops, //loops left
    val = fs[f]; //flick value
    
    var quit = this.flick(val, f, fs, l);
    
    this.trigger('flicker:update', val, f, fs, l);
    
	//flick
	if(quit === false){
    	//stop
    	this.flicker();
     }
      
	this.flicker_frame++;
  },
  
	update:function(t){
		this.timestep(t, this.flicker_change);
	},
	
})
.defines({
  
	/*
  
  loops defaults to 1
  id default to true
  
	FUTURE: 
	-allow backward animations
	-allow entry of an array of frames. So each counter will go to the next frame in the array
	*/
	flicker:function(duration, frames, loops, id){
		
	    //stop
		if(!re.is(duration) && this.flickering()){
			//stop flickering
			return this.flicker_stop();
		}
		
	    //convert to seconds
	    if(duration >= 100){
	    	duration /= 1000;
	    }
	    
		this.flicker_duration = duration || 1;
    
	    frames = (re.is(frames,'array')) ? frames : [frames];
    
		//setup counter for loops
		this.flicker_loops = loops || 1;
		
		this.stepProgress = 0;
		this.stepSize = (duration / frames.length) / re.loop().second;
    
	    this.flicker_frames = frames;
		this.flicker_frame = 0;
		
		if(!this.flickering()){
			this.on('update', this.flicker_update);
		}
		
	    //sets flicker status
		this.flicker_id = id || true;
    
		this.trigger('flicker:start');
    	
		//update frame then run
		//this.flicker_run();
		
		return this;
	},
	
	/*
	Check if flicker is running / compare current.
	
	this.flickering(); // returns current flicker name
	this.flickering('idle'); // false
	*/
	flickering:function(id){
		if(id){
			return this.flicker_id == id;	
		}
		
		return this.flicker_id;
	}
	
});