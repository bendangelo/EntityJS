/*
The group class automatically adds / removes entities when the comp is added to it. Each group acts as a singleton and is an array of entities. It is usually used in a system to catch specific entities and process them.

Usage:

	re.group("monsters");
	//OR
	re.g("monsters")
	.requires("units")
	.defines({
		findAt:function(x, y){
			return this.find(function(e){
				return e.atTile(x, y);
			});
		}
	})
	.init(function(){
		//called on creation
	});
	
	//create new instance
	re.g("monsters").create();

	re.e('monsters'); //joined group
	
	re('monsters').findAt(0, 0);

*/
re.group = re.g = function(title){
	if(!re.g._g[title]){
		re.g._g[title] = new re.g.init(title);
	}

	return re.g._g[title];
};

//contain all group classes
re.g._g = {};

re.g.init = function(name){
	this.name = name;

	this._requires = [];
	this._defines = {};
	var that = this;

	this._init = function(entities){
		if(entities)
			this.push.apply(this, entities);
	};

	this._group = function(name){
		this.name = name;
		re.base.call(this);

		//add all requires
		for(var i in that._requires){
			var s = re.g(that._requires[i]);
			this.def(s._defines);
		}
	};

	this._group.prototype = re.base.extendArray(re.array.prototype, {

		dispose:function(){
			re._g[this.name] = null;
			return this.each(function(e){
				if(e.dispose) e.dispose();
			});
		},

		add:function(e){
			this.push(e);
			return this.trigger("add", e);
		},

		remove:function(e){
			re.array.prototype.remove.call(this, e);
			return this.trigger("remove", e);
		}

	});
};

re.g.init.prototype = {

	requires:function(args){
		if(re.is(args,'string')) args = args.split(" ");

		this._requires = this._requires.concat(args);
		return this;
	},

	defines:function(obj){
		for(var i in obj){
			this._group.prototype[i] = obj[i];
			this._defines[i] = obj[i];
		}
		return this;
	},

	init:function(method){
		this._init = method;
		return this;
	},

	create:function(){
		var g = new this._group(this.name);
		re._g[g.name] = g;

		this._init.apply(g, arguments);

		return g;
	},

	_super:function(){
		return this._group.prototype;
	}

};