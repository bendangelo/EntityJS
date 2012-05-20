/*
The animate comp defines a simple interface for animating sprites.

//create entity with sprite sheet and animate comp
var apple = re.e('apple.png animate sprite');

//setup animations to play
apple.anis = {
			//time, frames, loops
	explode:[1000, [0, 1, 2], 1]
		  //seconds, frames, loops defaults to once
	trans:[0.5, [3, 4, 5]]	
};

//play animation
apple.animate('explode');

//stop animation
apple.animate();

//check animation playing
apple.flickering(); //this comes from flicker comp

*/
re.c('animate')
.requires('flicker')
.defines({
  	
	animate:function(name){
		//ignore if calling the same frame
		if(this.flickering() != name){
			
			var a = this.anis[name] || [];
			//flicker interface
			//(duration:int, frames:array, loops:int, id:string)
			this.flicker(a[0], a[1], a[2], name);

			//only run if a is defined
			if(a.length)
			this.flicker_run(); //run first frame
		}
		return this;
	},

    //implement for flicker
    flick:function(c){
        this.frame(c);
    }
  
});