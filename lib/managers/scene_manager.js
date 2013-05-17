en.SceneManager = en.Class.extend({

    current: null,

    init: function(){
        this.scenes = {};
    },

    add: function(name, scene){
        this.scenes[name] = scene;
    },

    enter: function(name, options){
        if(this.current){
            this.current.exit();
        }

        this.current = this.scenes[name];

        this.current.enter(options);
    }

});