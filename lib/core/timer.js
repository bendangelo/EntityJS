en.Timer = en.Class.extend({

});

en.Timer.tick = function(){
    var wall = Date.now();
    var last = this.lastTime;

    this.lastTime = wall;

    return wall - last;
};