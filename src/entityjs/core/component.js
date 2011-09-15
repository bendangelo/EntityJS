(function(re){
    
    /*
	If component exists, the component will NOT be overwritten.
	
	@return component reference
	*/
	comp = function(title){
		
		if(!this._c[title]){
			this._c[title] = new re.comp.init(title);
		}
		
		return this._c[title];
	}
	
	c = function(name){
		
		this.name = name;
		this._re_defaults = {};
		this._re_defines = {};
		this._re_signals = {};
	}
	
	var p = c.prototype;
	
	p.name = '';
	
    p._re_final = false;
    
	p._re_requires = '';
	
	/*
	//handy to find variable names
	p._re_defaults = null;
	
	p._re_defines = null;
	
	p._re_init = null;
	
	p._re_dispose = null;
	
	p._re_signals = null;
	
	p._re_asserts = null;
	
	p._re_interface = null;
	*/
    p._checkFinal = function(){
        
        if(this._re_final){
            throw this.name+' is final.';
        }
    }
    
	p.static = function(obj, value){
        this._checkFinal();
        
		if(typeof obj == 'object'){
			
			for(var type in obj){
				this[type] = obj[type];	
			}
			
		} else {
			this[obj] = value;	
		}
		
		return this;
	}
	
	p.require = function(requirements){
        this._checkFinal();
        this._re_requires += requirements+' ';
		
		return this;
	}
	
	/*
	Upon component init it will throw an error 
	if one of the listed components exist.
	
	This prevents incompatible components from colliding.
	*/
	p.assert = function(asserts){
		this._re_asserts = asserts.split(' ');
		
		return this;
	}
	
	/*
	Adds signal functionality to components.
	All components will automatically call two signals, init and dispose.
	
	Init on entity creation and dispose on entitiy disposition.
	
	This is useful for 'watch tower' components that keep a list of
	all entities that have its component. Check the cycle directory.
	
	*/
	p.signal = function(string, method){
		return re.entity.init.prototype.signal.call(this, string, method);
	}
	
	/*
	Default adds onto but doesn't overwrite values.
	*/
	p.default = function(d, value){
        this._checkFinal();
        
		if(typeof d == 'object'){
			
			for(var k in d){
				this._re_defaults[k] = d[k];	
			}
			
		} else {
			
			this._re_defaults[d] = value;
				
		}
		
		return this;
	}
	
	/*
	The run method allows a function to be ran in the context
	of the component.
	
	Useful to keep everything in one big component.
	*/
	p.run = function(method){
		this._checkFinal();
		
		method.call(this);
		
		return this;
	}
	
	/*
	Define overrides everything.
	*/
	p.define = function(d, value){
        this._checkFinal();
        
		if(typeof d == 'object'){
			
			for(var k in d){
				this._re_defines[k] = d[k];	
			}
		} else {
			this._re_defines[d] = value;
		}
		
		return this;	
	}
	
	p.init = function(method){
        this._checkFinal();
        
        this._re_init = method;
		
		return this;	
	}
	
	p.dispose = function(method){
        this._checkFinal();
        
        this._re_dispose = method;
		
		return this;	
	}
	
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
	p.alias = function(s){
        this._checkFinal();
        
        var p = s.split(' ');
		
		if(p.length > 1){
			
			for(var i in p){
				this.alias(p[i]);	
			}
			
			return this;	
		}
		
		if(s.charAt(0) == '-'){
			
			var t = re._c[s.substr(1)];
			
			//only remove if its a reference
			if(t == this){
				delete t;
			
				return t;
			}
		} else {
		
			re._c[s] = this;
		}
		
		return this;
	}
	
	/*
	The final method locks the component from modification.
	
	This is handy to stop unexpected changes to a component.
	*/
	p.final = function(){
        this._checkFinal();
		
        this._re_final = true;
		
		return this;
	}
	
	/*
	The interface method checks and enforces implmentation
	of the given keys. This can create interface components
	for organization and query searches.
	
	Forcing an interface on components will allow instant
	runtime errors and save time.
	
	//reccommended to put an i infront to represent an interface
	re.c('ienemy')
	//create an enemy interface
	.interface('moveTo spawn attack runAway');
	
	*/
	p.interface = function(i){
        this._checkFinal();
		
		if(this._re_interface){
			this._re_interface += ' '+i;
		} else {
			this._re_interface = i;
		}
		
		return this;
	}
    
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
    p.namespace = function(obj, value){
        this._checkFinal();
        var name = this.name+'_';
        
        if(typeof obj == 'object'){
        
            for(var k in obj){
            	this._re_defines[name+k] = obj[k];
            }
        
        } else {
            this._re_defines[name+obj] = value;
        }
        
        return this;
    }
    
	re.comp = re.c = comp;
	
	re.comp.init = c;
	
}(re));