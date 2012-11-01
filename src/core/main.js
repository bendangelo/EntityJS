/*
The main component contains all information and references to the entity js engine.
Such as the canvas context, fps, start, stop, canvas.

You can add the component to entities for quick reference to variables.

FUTURE
-add entity definess to allow local usage.
-perhaps allow users to override the main class for their own custom usage. (new arrays of entities and components)
*/
re.c('main')
.defaults({
    
    clearColor:'#f9f9f9',
    
    stepSize:0.03,
    maxTick:0.05,
    
    running:false,
    
    sizeX:10, 
    sizeY:10
    
})
.defines({
    
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
            (function m(){
              
              that.main_loop();
              
              if(that.running){
                that.requestAnimationFrame(m, that.canvas);
              }
            })();
            
        }
        
        return  this;
    },
    
    loop:function(m){
        
        this.main_loop = m;
    
        return this;
    },
    
    stop:function(){
        this.running = false;
        return this;
    },
    
    //scale is currently not implemented!
    init:function(canvasId, contextType){
        
        //add comps here because main is defined earlier than other comps
        this.comp('polyfill tick timestep');
        
        //setup canvas
        if(re.is(canvasId, 'htmlcanvaselement')){
          this.canvas = canvasId;
        } else {
          this.canvas = re.$(canvasId);
        }
        
        this.context = this.canvas.getContext(contextType || '2d');
        
        var s = re.screen = re.e('screen');
        
        this.sizeX = s.sizeX = this.canvas.width;
        this.sizeY = s.sizeY = this.canvas.height;
        
        //init listeners
        if(re.keyboard){
          re.keyboard.i();
        }
        if(re.mouse){
          re.mouse.i();
        }
        if(re.touch){
          re.touch.i();
        }
        this.main_loop = this.defaultLoop;
        this.second = this.stepSize * 30;
        
        return this;
    },
    
    /*
    Default main loop
    */
    defaultLoop:function(){
        
        this.timestep(Math.min(this.tick() / 1000, this.maxTick), function(){
            //update
            this.update();
        });
        
        //clear
        this.clear(this.clearColor);
        this.draw();
    },
    
    update:function(){
      re.update.update(this.stepSize);
    },
    
    draw:function(){
      //renders default drawlist
      re.drawlist().drawlist(this.context);
    }
    
    
});
    
//create default main
re.main = re.e('main');