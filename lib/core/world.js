en.World = en.Class.extend({

    running: false,
    stepSize: 0.03,
    maxTick: 0.05,
    stepProgress: 0,
    color: "#f9f9f9",

    init: function(canvas){
        this.setCanvas(canvas);

        // find supported animation frame
        this.requestAnimationFrame =
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function(callback){
            window.setTimeout(callback, 1000 / 60);
        };

        this._requestAnimBind = this._requestAnim.bind(this);

        this.drawSystem = new en.DrawSystem(this.context);
        this.updateSystem = new en.UpdateSystem();

        this.mouseSystem = new en.MouseSystem(this.canvas);
        this.keySystem = new en.KeySystem();
    },

    setCanvas: function(canvas){
        if(typeof canvas == "string"){
            this.canvas = en.$(canvas);
        } else {
            // assuming its a canvas element
            this.canvas = canvas;
        }

        this.context = this.canvas.getContext('2d');

        this.width = this.canvas.width;
        this.height = this.canvas.height;

        return this;
    },

    start: function(){
        if(!this.running){
            this.running = true;

            this._requestAnimBind();
        }
    },

    stop: function(){
        this.running = false;
        return this;
    },

    _requestAnim: function(){
        this.run();

        if(this.running){
            this.requestAnimationFrame(this._requestAnimBind, this.canvas);
        }
    },

    run: function(){

        var progress = Math.min(en.Timer.tick() / 1000, this.maxTick);

        this.stepProgress += progress;

        while(this.stepProgress >= this.stepSize){
            this.update();
        }

        this.draw();
    },

    update: function(){
        this.updateSystem.processAll();
    },

    draw: function(){
        // clear whole screen
        this.context.fillStyle = this.color;
        this.context.fillRect(0, 0, this.width, this.height);

        this.drawSystem.processAll();
    }

});