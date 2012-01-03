
	/*
	Quick way to convert sentences to arrays.
	*/
	var __z = function(n, r){
        this._checkFinal();
		
		if(!this[n]){
			this[n] = [];
		}
		
		if(typeof r == 'string'){
			this[n] = this[n].concat(r.split(' '));
		} else {
			this[n] = this[n].concat(r);
		}
		
		return this;
	};
	
    /*
	If component exists, the component will NOT be overwritten.
	
	@return component reference
	*/
	re.comp = re.c = function(title){
		
		if(!re._c[title]){
			re._c[title] = new re.comp.init(title);
		}
		
		return re._c[title];
	};
	
	re.comp.init = function(name){
		
		this.name = name;
		this._re_signals = {};
		this._re_inherits = {};
		this._re_extends = {};
		this._re_final = false;
	};
	
	/*
	p._re_requires = null;
	
	p._re_init = null;
	
	p._re_dispose = null;
	
	p._re_asserts = null;
	
	p._re_interface = null;
	*/
	
re.comp.init.prototype = {
	
    _checkFinal:function(){
        
        if(this._re_final){
            throw this.name+' is final.';
        }
    },
    
	global:function(obj, value){
        this._checkFinal();
        
		if(arguments.length == 1){
			
			for(var type in obj){
				this[type] = obj[type];	
			}
			
		} else {
			this[obj] = value;	
		}
		
		return this;
	},
	
	
	require:function(r){
		return __z.call(this, '_re_requires', r);
	},
	
	/*
	Upon component init it will throw an error 
	if one of the listed components exist.
	
	This prevents incompatible components from colliding.
	*/
	assert:function(r){
		return __z.call(this, '_re_asserts', r);
	},
	
	/*
	The implement method checks and enforces implmentation
	of the given keys. This can create interface components
	for organization and query searches.
	
	Forcing an interface on components will allow instant
	runtime errors and save time.
	
	//reccommended to put an i infront to represent an interface
	re.c('ienemy')
	//create an enemy interface
	.interface('moveTo spawn attack runAway');
	
	*/
	implement:function(r){
		return __z.call(this, '_re_implments', r);
	},
    
	/*
	Creates new names for a component.
	
	//create a new alias of draw
	re.c('draw')
	.alias('bob');
	
	//remove alias
	re.c('draw')
	.alias('-bob');
	
	//aliases can even delete components itself
	re.c('draw').alias('-draw');
	
	//add two aliases
	re.c('draw').alias('dr bob');
	
	*/
	alias:function(s){
        this._checkFinal();
        
        var p = s.split(' ');
		
		if(p.length > 1){
			
			for(var i in p){
				this.alias(p[i]);	
			}
			
			return this;	
		}
		
		if(s.charAt(0) == '-'){
			//only remove if its a reference
			if(re._c[s.substr(1)] == this){
				delete re._c[s.substr(1)];
			}
		} else {
		
			re._c[s] = this;
		}
		
		return this;
	},
	
	bind:function(){
		return re.e.init.prototype.bind.apply(this, arguments);
	},
	
	unbind:function(){
		return re.e.init.prototype.unbind.apply(this, arguments);
	},
	
	/*
	Adds trigger functionality to components.
	All components will automatically call two signals, init and dispose.
	
	Init on entity creation and dispose on entitiy disposition.
	
	This is useful for 'watch tower' components that keep a list of
	all entities that have its component. Check the cycle directory.
	
	*/
	trigger:function(){
		return re.e.init.prototype.trigger.apply(this, arguments);
	},
	
	/*
	Default adds onto but doesn't overwrite values.
	*/
	defaults:function(d, value){
        this._checkFinal();
        
		if(arguments.length == 1){
			
			for(var k in d){
				this._re_inherits[k] = d[k];	
			}
			
		} else {
			
			this._re_inherits[d] = value;
				
		}
		
		return this;
	},
	
    /*
    The namespace method is used to put private component variables
    in its own space. This prevents unwanted overrites.
    
    re.c('draw')
    .namespace({
    pos:0,
    type:'none'
    
    });
    
    //or
    re.c('draw')
    .namespace("pos", 0);
    
    //Will cast to 
    this.draw_pos = 10;
    this.draw_type = 'none';
    
    */
    namespace:function(obj, value){
        this._checkFinal();
        var name = this.name+'_';
        
        if(arguments.length == 1){
        
            for(var k in obj){
            	this._re_extends[name+k] = obj[k];
            }
        
        } else {
            this._re_extends[name+obj] = value;
        }
        
        return this;
    },
    
	/*
	extend overrides everything.
	*/
	extend:function(d, value){
        this._checkFinal();
        
		if(!this._re_extends){
			this._re_extends = {};
		}
		if(arguments.length == 1){
			
			for(var k in d){
				this._re_extends[k] = d[k];	
			}
			
		} else {
			this._re_extends[d] = value;
		}
		
		return this;	
	},
	
	init:function(method){
        this._checkFinal();
        
        this._re_init = method;
		
		return this;	
	},
	
	dispose:function(method){
        this._checkFinal();
        
        this._re_dispose = method;
		
		return this;	
	},
	
	/*
	The lock method prevents modification to the component.
	
	This is handy to stop unexpected changes to a component.
	*/
	lock:function(){
        this._checkFinal();
		
        this._re_final = true;
		
		return this;
	},
	
	/*
	The run method allows a function to be ran in the context
	of the component.
	
	Useful to keep everything in one big component.
	*/
	run:function(method){
		this._checkFinal();
		
		//re.ready(function(){
			method.call(this);
		//});
		
		return this;
	}
	
};