/*
The system class defines a special component which can control all entities. It can be called every frame in the main loop or whenever.

Usage:
	
	re.s("monster_render")
	.requires("render")
	.defines({
		
		process:function(entity){
			if(entity.render && entity.visible()) entity.render();
		}

	})
	.init(function(drawables){
		this.drawables = drawables;
	});

	re.s('render').create();

	//system doesn't need a dispose method
	//simply remove all references

*/

re.system = re.s = function(title){
	//create if doesn't exist
	if(!re._s[title]){
		re._s[title] = new re.s.init(title);
	}

	return re._s[title];
};

re.s.init = function(name){
	this.name = name;
	this._requires = [];
	this._defines = {};

	var that = this;
	this._init = function(c){
		this.entities = c;
	};
	this._system = function(){
		re.base.call(this);

		//add all requires
		for(var i in that._requires){
			var s = re.s(that._requires[i]);
			this.def(s._defines);
		}

		that._init.apply(this, arguments);
	};

	this._system.prototype = re.base.extend({

		processAll:function(){
			if(this.canProcess.apply(this, arguments)){

				var args = [].slice.call(arguments);
				args.unshift(0);

				for(var i=0; i<this.entities.length; i++){
					args[0] = this.entities[i];
					
					this.process.apply(this, args);
				}
				
			}
			return this;
		},

		//process as long as entities is not empty
		canProcess:function(){
			return this.entities.length;
		},

		dispose:function(){
			if(this.entities.dispose) this.entities.dispose();
			this.entities = null;
		}

	});
};

re.s.init.prototype = {

	requires:function(args){
		if(re.is(args,'string')) args = args.split(" ");

		this._requires = this._requires.concat(args);
		return this;
	},

	defines:function(obj){
		for(var i in obj){
			this._system.prototype[i] = obj[i];
			this._defines[i] = obj[i];
		}
		return this;
	},

	init:function(method){
		this._init = method;
		return this;
	},

	create:function(a, b, c){
		return new this._system(a, b, c);
	},

	_super:function(){
		return this._system.prototype;
	}

};