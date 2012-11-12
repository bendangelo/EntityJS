/*
The main component contains all information and references to the entity js engine.
Such as the canvas context, fps, start, stop, canvas.

You can add the component to entities for quick reference to variables.

*/
re.c('loop')
.singleton()
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

            var that = this,
            m;
            (m = function(){

              that.loop();

              if(that.running){
                that.requestAnimationFrame(m, that.canvas);
              }
            })();

        }

        return  this;
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

        var s = re.screen();

        this.sizeX = s.sizeX = this.canvas.width;
        this.sizeY = s.sizeY = this.canvas.height;

        this.second = this.stepSize * 30;

        this.initSystems();

        return this;
    },

    initSystems:function(){
        //init systems
        this.keyboardSys = re.s('keyboard').create();
        this.mouseSys = re.s('mouse').create(this.canvas);
        // this.touchSys = re.s('touch').create();

        this.renderSys = re.s('render').create(this.context);
        this.updateSys = re.s('update').create();
    },

    /*
    Default main loop
    */
    loop:function(){

        this.timestep(Math.min(this.tick() / 1000, this.maxTick), function(){
            //update
            this.update();
        });

        this.draw();
    },

    update:function(){
        this.updateSys.processAll();
    },

    draw:function(){
        //clear
        this.clear(this.clearColor);
        this.renderSys.processAll();
    }

});