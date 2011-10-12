/*
The system component contains all information and references to the entity js engine.
Such as the canvas context, fps, start, stop, canvas.

You can add the component to entities for quick reference to variables.

FUTURE
-add entity extends to allow local usage.
-perhaps allow users to override the system class for their own custom usage. (new arrays of entities and components)
*/
re.c('system')
.inherit({
	
	contextType:'2d',
	
	clearColor:'#f9f9f9',
	
	stepSize:0.03,
	
	running:false,
	
	sizeX:0,
	sizeY:0
	
})
.extend({
	
	clear:function(color){
		
		if(color){
			this.context.fillStyle = color;
			this.context.fillRect(0, 0, this.sizeX, this.sizeY);
		} else {
			this.context.clearRect(0, 0, this.sizeX, this.sizeY);
		}
		
		return this;
	},
	
	start:function(){
		if(!this.running){
			this.running = true;
			
			var that = this;
			
			(function mainLoop(){
					
				that.system_loop.call(that);
					
				if(that.running){
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
		this.running = false;
		return this;
	},
	
	init:function(canvasId, screen, contextType){
		
		//add comps here because system is extendd earlier
		this.addComp('polyfill ticker timestep');
		
		//setup canvas
		this.canvas = re.$(canvasId);
		
		this.contextType = contextType || this.contextType;
		
		this.context = this.canvas.getContext(this.contextType);
		
		this.sizeX = this.canvas.width;
		this.sizeY = this.canvas.height;
		
		screen = screen || re.screen;
		
		if(screen){
			screen.sizeX = this.sizeX;
			screen.sizeY = this.sizeY;
			
			screen.regX = this.sizeX * 0.5;
			screen.regY = this.sizeY * 0.5;
		}
		
		return this;
	},
	
	/*
	Default main loop
	*/
	system_loop:function(){
		
		this.timestep(this.tick(), function(){
			//update
			re._c.update.update.call(re._c.update, this, this.stepSize);
		});
		
		//clear
		this.clear(this.clearColor);
		
		re._c.draw.draw.call(re._c.draw, this);
	}
	
	
})
.run(function(){
	
	//create default system
	re.system = re.sys = re.e('system');
	
});