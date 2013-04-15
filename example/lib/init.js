re.ready(function() {

    re.load.path = "/assets/";

    re.assets = [
        "images/bit.png",
        "images/hero.png",
        "images/items.png",
        "images/tiles.png",
    ];

    re.loop().init(re.$("#game-canvas")).start();

    re.scene('load').enter();

});