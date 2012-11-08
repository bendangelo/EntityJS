re.s('isomouse')
.requires('mouse')
.defines({

    process:function(e, x, y, type, button, event){

        x = this.processX(e, x);
        y = this.processY(e, y);

        //convert pos into isometric tile position
        var iso = re.iso.toIso(x, y);

        //call mouse methods if they exist
        //see cursor comp
        if(e[type]){
            e[type](iso.isoX, iso.isoY, e);
        }

        //sort tiles
        re('render').sort(function(a, b){
            return a.depth() - b.depth();
        });
    }

})
.init(function(canvas){
    this.entities = re.g('isomouse').create();
    this.bindEvents(canvas);
});