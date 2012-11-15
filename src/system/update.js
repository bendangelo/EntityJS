re.s('update')
.defines({

	process:function(e){
		if(e.updatable) e.trigger('update', this.stepSize);
	}

})
.init(function(){
    this.stepSize = re.loop().stepSize;
	this.entities = re.g('update').create();
});