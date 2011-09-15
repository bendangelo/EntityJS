/*
The system component contains all information and references to the entity js engine.
Such as the canvas context, fps, start, stop, canvas.

You can add the component to entities for quick reference to variables.

FUTURE
-add entity defines to allow local usage.
-perhaps allow users to override the system class for their own custom usage. (new arrays of entities and components)
*/
re.system = re.sys = re.c('system')
.static({
	
	size:{x:0, y:0},
	
	clearColor:'#f9f9f9',
	
	running:false,
	
	clear:function(color){
		
		re.system.context.fillStyle = color;
		re.system.context.fillRect(0, 0, re.system.size.x, re.system.size.y);	
		
		return this;
	},
	
	start:function(){
		if(!re.system.running){
			re.system.running = true;
			
			re.sys.inter = re.e('interval').start(re.sys.fps, re.sys._d);
		}
		
		return this;
	},
	
	delegate:function(m){
	
		re.sys._d = m;
	
		return this;
	},
	
	_d:function(){
		//clear
		re.system.clear(re.system.clearColor);
	
		//update
		re.c('update').update();
	
		re.c('draw').draw(re.system.context);
	},
	
	stop:function(){
		if(re.sys.running){
			re.system.running = false;
			
			re.sys.inter.stop();
			
			
		}
		return this;
	},
	
	init:function(canvasId, fps){
		
		//setup canvas
		this.canvas = re.$(canvasId);
		
		this.context = this.canvas.getContext('2d');
		
		this.size.x = this.canvas.width;
		this.size.y = this.canvas.height;
		
		//setup mainloop
		if(arguments.length >= 2){
			re.system.fps = fps;
		}
		
		return this;
	}
	
	
});