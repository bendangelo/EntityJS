Game = {

    Scenes: {},
    Levels: {},
    Items: {},
    Graphics: {},

    init: function(){
        this.tileSize = 25;

        this.world = new Game.World();
        this.sceneManager = this.world.sceneManager;

        for(var i in Game.Scenes){
            this.sceneManager.add(i.toLowerCase(), new Game.Scenes[i]());
        }

        // start running entities
        this.world.start();

        this.sceneManager.enter("load");
    }

};

// entry point
Game.init();