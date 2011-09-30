/*
This is a demo of the pressed component and sprite component.

By using WASD or the arrow keys you can move the sprite
across the canvas.

*/

//Its good practice to keep all constants in an organized object.
//This makes it easier to edit in the future.
re.constants = {
	canvasId:'#canvas',
	assets:"arrow.png",
	arrowSpeed:120,
	arrowSize:{x:40, y:40}

};

//first step of every entityjs game is to define a ready function
//this will be called when the webpage is finished loading.
re.ready(function(){
	
	//because we're not running on a server turn off root path
	re.load.path = '';
	
	//load up the spritesheet
	re.load(re.constants.assets)
	.complete(function(){
		
		//inits the system
		re.system.init(re.constants.canvasId);
		
		re.sys.clearColor = '#FFFFFF';

		//starts the mainloop of the application
		//you can also write sys for shortform
		re.sys.start();
		
		//create moving arrow
		re.entity('arrow');
		
		//add listener for space presses
		//you can also call re.e instead of re.entity
		re.e('keyboard')
		//listens for keyup on the space key
		.signal('keydown:space', function(){
			
			//creates a new entity with the arrow component
			re.e('arrow');
			
		})
		//second signal
		//remove key upon R key up
		.signal('keyup:r', function(){
			
			var q = re('arrow');
			if(q.length() > 0){
				
				//remove first arrow from array
				re('arrow').get(0).dispose();
			}
			
		});
		
	})
	.error(function(){
		console.log('Error something went wrong.');
	})
	.progress(function(current, total, asset){
		console.log('Progress: '+current+' / '+ total);
		console.log('Asset loaded: ', asset);
	});
	
});

/*
This creates a new component kinda like a class 
except it can be removed or added at anytime.

*/
re.c('arrow')
//adds requirement components
.require('pressed update sprite arrow.png')
//define constructor
.init(function(){
	//center arrow
	this.pos.x = re.sys.size.x * 0.5;
	this.pos.y = re.sys.size.y * 0.5;
	
	//this will break the sprite sheet into grids
	this.frame.size.x = re.constants.arrowSize.x;
	this.frame.size.y = re.constants.arrowSize.y;
	
	//listens for updates every frame
	this.signal('update', this.arrow_update);
	
	//prevents default action of keys
	this.preventDefault('up left right down space r');
	
})
//define deconstructor
.dispose(function(){
	
	//the -update will remove the signal
	this.signal('-update', this.arrow_update);
	
})
//values here are set only if they are null
.inherit({
	speed:re.constants.arrowSpeed
})
//define private variables of the arrow component
.namespace({

	update:function(tick, total){
		var s = this.speed * tick;
		
		//move based on keypress	
		//listens for w key down OR up key down
		if(this.pressed('w', 'up')){
		
			this.pos.y -= s;
			
			this.setFrameId(0);
			
		} else if(this.pressed('s', 'down')){
		
			this.pos.y += s;
			this.setFrameId(2);
			
		}
		
		if(this.pressed('a', 'left')){
		
			this.pos.x -= s;
			this.setFrameId(3);
			
		} else if(this.pressed('d', 'right')){
		
			this.pos.x += s;
			this.setFrameId(1);
			
		}
		
	}
	
});