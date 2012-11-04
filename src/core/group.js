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
	if(!re._g[title]){
		re._g[title] = new re.g.init(title);
	}

	return re._g[title];
};

re.g.init = function(name){
	this.name = name;

	this._requires = [];
	var that = this;

	this._init = function(c){

	};

	this._group = function(){
		re.class.call(this);

		//add all requires
		for(var i in that._requires){
			var s = re.g(that._requires[i]);
			s._init.apply(this, arguments);
			this.attr(s._group.prototype);
		}

		that._init.apply(this, arguments);
	};

	this._group.prototype = re.extend(re.array.prototype, {

		dispose:function(){

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
		}
		return this;
	},

	init:function(method){
		this._init = method;
		return this;
	},

	create:function(){
		var g = new this._group();
		re._g[g.name] = g;

		return g;
	}

};