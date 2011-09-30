/*
The system component contains all information and references to the entity js engine.
Such as the canvas context, fps, start, stop, canvas.

You can add the component to entities for quick reference to variables.

FUTURE
-add entity defines to allow local usage.
-perhaps allow users to override the system class for their own custom usage. (new arrays of entities and components)
*/
re.c('system')
.define({
	
	clearColor:'#f9f9f9',
	
	running:false,
	
	clear:function(color){
		
		if(color){
			this.context.fillStyle = color;
			this.context.fillRect(0, 0, this.size.x, this.size.y);
		} else {
			this.context.clearRect(0, 0, this.size.x, this.size.y);
		}
		
		return this;
	},
	
	start:function(){
		if(!this.running){
			this.running = true;
			
			var that = this;
			
			(function mainLoop(){
				if(that.running){
					
					that.system_loop.call(that);
					
					that.requestAnimationFrame(mainLoop, that.canvas);
				}
			})();
			
			
		}
		
		return this;
	},
	
	loop:function(m){
		
		this.system_loop = m;
	
		return this;
	},
	
	stop:function(){
		if(this.running){
			this.running = false;
		}
		return this;
	},
	
	init:function(canvasId, screen){
		
		//add comps here because system is defined earlier
		this.comp('polyfill ticker');
		
		//setup canvas
		this.canvas = re.$(canvasId);
		
		this.context = this.canvas.getContext('2d');
		
		this.size.x = this.canvas.width;
		this.size.y = this.canvas.height;
		
		screen = screen || re.screen;
		
		if(screen){
			screen.size.x = this.size.x;
			screen.size.y = this.size.y;
			screen.reg.x = this.size.x * 0.5;
			screen.reg.y = this.size.y * 0.5;
		}
		
		return this;
	},
	
	/*
	Default main loop
	*/
	system_loop:function(){
		
		//update
		re._c.update.update.call(re._c.update, this, this.tick(), this.time);
		
		//clear
		this.clear(this.clearColor);
		
		re._c.draw.draw.call(re._c.draw, this, this.context);
	}
	
	
})
.init(function(c){
	
	this.size = {x:0, y:0};
	
})
.run(function(){
	
	//create default system
	re.system = re.sys = re.e('system');
	
});