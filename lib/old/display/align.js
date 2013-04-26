/*
The align component contains helper methods for positioning entities relative to system size.

@warning aligning with negative values will not round down but up!

*/
re.c('align')
.defaults({
    regX:0,
    regY:0,
    sizeX:1,
    sizeY:1,
    posX:0,
    posY:0
})
.defines({

    align:function(x, y){
        this.alignHor(x);
        return this.alignVer(y);
    },

    alignHor:function(o){
        o = o || 0;
        this.set('posX', re.loop().sizeX * 0.5 - (this.get('sizeX') - this.get('regX'))*0.5 + o | 0);

        return this;
    },

    alignVer:function(o){
        o = o || 0;
        this.set('posY', re.loop().sizeY * 0.5 - (this.get('sizeY') - this.get('regY'))*0.5 + o | 0);
        return this;
    },

    alignRight:function(x){
        x = x || 0;
        this.set('posX', re.loop().sizeX - (this.get('sizeX') - this.get('regX')) + x | 0);
        return this;
    },

    alignLeft:function(x){
        x = x || 0;
        var s = this.get('sizeX');
        this.set('posX', x + s - (s - this.get('regX')) | 0);
        return this;
    },

    alignTop:function(y){
        y = y || 0;
        var s = this.get('sizeY');
        this.set('posY', y + s - (s - this.get('regY')) | 0);
        return this;
    },

    alignBottom:function(y){
        y = y || 0;
        this.set('posY', re.loop().sizeY - (this.get('sizeY') - this.get('regY')) + y | 0);
        return this;
    }

});