re.s('update')
.defines({

	process:function(e){
		if(e.updatable) e.trigger('update');
	}

})
.init(function(){
	this.entities = re.g('update').create();
});