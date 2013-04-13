re.s('render')
.defines({

	process:function(e){
		if(e.visible && !e.visible()) return;

		if(e.draw){
            this.begin(e, this.context);
    			e.draw(this.context);
            this.end(e, this.context);
		}
	},

	begin:function(e, c){

        c.save();

        if(e.alpha-1)
            c.globalAlpha = e.alpha;

        if(e.screenable)
            c.translate(e.screenX(), e.screenY());
        else
            c.translate(e.posX, e.posY);

        if(e.rotation)
            c.rotate(e.rotation * Math.PI / 180);


        if(e.scaleX != 1 || e.scaleY != 1)
            c.scale(e.scaleX, e.scaleY);

	},

	end:function(e, c){
        c.restore();
	}

})
.init(function(context, entities){
	this.context = context;
	this.entities = entities || re.g('render').create();
});