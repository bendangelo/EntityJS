re.s('render')
.defines({

	process:function(e){
		if(e.visible && !e.visible()) return;
		
		if(e.render) e.render(this.context);
	}

})
.init(function(context){
	this.context = context;
	this.entities = re.g('render').create();
});