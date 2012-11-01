/*
The system class defines a special component which can control all entities. It can be called every frame in the main loop or whenever.

Usage:

	re.s('draw')
	.defines({
		
		process:function(entity){
			if(entity.draw) entity.draw();
		}

	})
	.factory(function(drawables){
		this.drawables = drawables;
	});

*/
re.system = re.s = function(title, data){

};

re.s.init = function(name){

};

re.s.init.prototype = {

	processEntities:function(entities){
		for(var i in entities){
			this.process(entities[i]);
		}
	},

	process:function(entity){

	}

};