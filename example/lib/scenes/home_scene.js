Game.Scenes.Home = en.Scene.extend({

    enter: function(){

        var levelNum = 0;

        Game.sceneManager.enter("play", {level: levelNum});

    }

});