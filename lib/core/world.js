en.World = en.Class.extend({

    running: false,
    stepSize: 0.03,
    maxTick: 0.05,
    stepProgress: 0,

    init: function(canvas){
        if(canvas){
            this.setCanvas(canvas);
        }

        this.sceneManager = new en.SceneManager();
        this.groupManager = new en.GroupManager();

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

        this._requestAnimbind = this._requestAnim.bind(this);
    },

    setCanvas: function(canvas){
        if(typeof canvas == "string"){
            this.canvas = en.$(canvas);
        } else {
            // assuming its a canvas element
            this.canvas = canvas;
        }

        this.context = this.canvas.getContext('2d');

        return this;
    },

    start: function(){
        if(!this.running){
            console.assert(this.sceneManager.current, "Current scene is null");
            this.running = true;

            this._requestAnim();
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
            this.sceneManager.current.update();
        }

        this.sceneManager.current.draw();
    }

});