re.s('render')
.defines({

	process:function(e){
		if(e.render) e.render();
	}

})
.init(function(){
	this.entities = re.g('render').create();
});