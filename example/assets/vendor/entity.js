/* Entity Game Engine | MIT License */

(function(window){var en;

// export to nodejs or browser window
if(typeof exports != "undefined"){
    en = exports;
} else {
    en = window.en = {};
}

if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {

    define(function() {
      return en;
    });

}

en.$ = function(id){
    return document.getElementById(id.substr(1));
};
/* Simple JavaScript Inheritance
 * By John Resig http://ejohn.org/
 * MIT Licensed.
 */
// Inspired by base2 and Prototype
(function(){
  var initializing = false, fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;

  // The base Class implementation (does nothing)
  this.Class = function(){};

  // Create a new Class that inherits from this class
  Class.extend = function(prop, statics) {
    var _super = this.prototype;

    // Instantiate a base class (but only create the instance,
    // don't run the init constructor)
    initializing = true;
    var prototype = new this();
    initializing = false;

    var name;

    // Copy the properties over onto the new prototype
    for (name in prop) {
      // Check if we're overwriting an existing function
      prototype[name] = typeof prop[name] == "function" &&
        typeof _super[name] == "function" && fnTest.test(prop[name]) ?
        (function(name, fn){
          return function() {
            var tmp = this._super;

            // Add a new ._super() method that is the same method
            // but on the super-class
            this._super = _super[name];

            // The method only need to be bound temporarily, so we
            // remove it when we're done executing
            var ret = fn.apply(this, arguments);
            this._super = tmp;

            return ret;
          };
        })(name, prop[name]) :
        prop[name];
    }

    // add properties to class
    if(statics){
      for(name in statics){
        Class[name] = statics[name];
      }
    }

    // The dummy class constructor
    function Class() {
      // All construction is actually done in the init method
      if ( !initializing && this.init )
        this.init.apply(this, arguments);
    }

    // Populate our constructed prototype object
    Class.prototype = prototype;

    // Enforce the constructor to be what we expect
    Class.prototype.constructor = Class;

    // And make this class extendable
    Class.extend = arguments.callee;

    return Class;
  };
})(en);
en.Entity = en.Events.extend({

});

en.Events = en.Class.extend({

    on: function(name, callback, context){
        if(!this._events){
            this._events = {};
        }

        if(!this._events[name]){
            this._events[name] = [];
        }

        console.assert(!method, "Event callback is null");

        this._events[name].push({callback: callback, context: context || this});

        return this;
    },

    off: function(name, callback){

        if(method){
            var types = this._events[name];

            if(types){
                for(var i in types){
                    if(types[i].callback == callback){
                        types.splice(i, 1);
                    }
                }
            }

        } else if(name){
            this._events[name] = [];
        } else {
            this._events = {};
        }
    },

    trigger: function(type){
        if(!this._events[type]) return this;

        var events = this._events[type], e;

        for(var i=0, l = events[type].length; i<l; i++){
            e = events[i];

            if(!e) break;

            e.callback.apply(e.context, Array.prototype.slice.call(argments, 1));
        }

        return this;
    },

    listenTo: function(){
        console.assert(false);
    },

    stopListening: function(){
        console.assert(false);
    }

});
en.Loader = en.Events({

});
en.Scene = en.Class.extend({

    enter: function() {

    },

    exit: function() {

    }

});
en.Timer = en.Class.extend({

},
{
    tick: function(){
        var wall = Date.now();
        var last = this.lastTime;

        this.lastTime = wall;

        return wall - last;
    }
});
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

en.Image = en.Class.extend({

});
en.SceneManager = en.Class.extend({

    lastScene: null,

    init: function(){
        this.scenes = {};
    },

    add: function(name, scene){
        this.scenes[name] = scene;
    },

    enter: function(name, options){
        if(this.lastScene){
            this.lastScene.exit();
        }

        this.lastScene = this.scenes[name];

        this.lastScene.enter(options);
    }

});
en.Sound = en.Class.extend({

});
en.DrawSystem = en.System.extend({

});
en.KeySystem = en.System.extend({

});
en.MouseSystem = en.System.extend({

});
en.System = en.Class.extend({

    init: function(){
        this.entities = [];
    },

    processAll: function(){
        for(var i in this.entities){
            this.process(this.entities[i]);
        }
    }

});
en.UpdateSystem = en.System.extend({

});})(this);