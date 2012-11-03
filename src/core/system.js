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
	var that = this;
	this._init = function(c){
		this.entities = c;
	};
	this._system = function(){
		that._init.apply(this, arguments);
	};

	this._system.prototype = {

		processAll:function(){
			if(this.canProcess()){
				this.begin();
				for(var i=0; i<this.entities.length; i++){
					this.process(this.entities[i]);
				}
				this.end();
			}
			return this;
		},

		begin:function(){

		},

		end:function(){

		},

		//process as long as entities is not empty
		canProcess:function(){
			return !this.entities.length;
		}

	};
};

re.s.init.prototype = {

	requires:function(args){
		if(re.is(args,'string')) args = args.split(" ");

		this._requires = 
	},

	defines:function(obj){
		for(var i in obj){
			this._system.prototype[i] = obj[i];
		}
		return this;
	},

	init:function(method){
		this._init = method;
		return this;
	},

	create:function(a, b, c){
		return new this._system(a, b, c);
	}

};