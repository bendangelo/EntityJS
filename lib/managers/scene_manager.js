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