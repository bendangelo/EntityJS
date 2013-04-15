/*
The animate comp defines a simple interface for animating sprites.

//create entity with sprite sheet and animate comp
var apple = re.e('apple.png animate sprite');

//setup animations to play
apple.animates = {
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

  //overload flickers method
	flicker_stop:function(){
		this._super('flicker', 'flicker_stop');
		if(this.animate_finish) this.animate_finish();
	},

	animate:function(name, onFinish, onUpdate){
		//ignore if calling the same animation
		if(this.flickering() != name){

        	this.animate_finish = onFinish;
        	this.animate_update = onUpdate;

			var a = this.animates[name];
			//flicker interface
			//(duration:int, frames:array, loops:int, id:string)
			this.flicker(a[0], a[1], a[2], name);

			//only run if a is defined
			if(a.push)
				this.flicker_run(); //run first frame
		}
		return this;
	},

	animating:function(t){
		return this.flickering(t);
	},

  //implement for flicker
  flick:function(c){
      this.frame(c);
      if(this.animate_update)  this.animate_update.apply(this, arguments);
  }

});