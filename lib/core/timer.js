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