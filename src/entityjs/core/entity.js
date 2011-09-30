(function(re){
	
	/*
	Main function for re.e
	
	//create multiple entities
	re.e('spider', 10)
	//returns a query with all entities
	.each(function(index){
		this.pos.x = index * 10;
	});
	
	*/
	var q = function(c, count){
		if(!count){
			return new re.entity.init(c);
		}
		
		//optimize for multiple calls
		var q = re();
		
		//create entity by number of count
		for(var i=0; i<count; i++){
			q._e.push(re.e(c));
		}
		
		return q;
	}
	
	q.id = 0;
	
	var e = function(c){
		c = c || '';
		
		this._re_comps = [];
		this._re_signals = {};
		
		q.id++;
		
		this.id = q.id+'';
		
		re._e.push(this);
		
		this.comp(c);
	}
	
	var p = e.prototype;
	
	p.id = '';
	
	/*
	//add components
	this.comp('point text');
	
	//add health component with 100 health
	this.comp('health:100 physics');
	
	//remove components
	this.comp('-point');
	*/
	p.comp = function(com){
		
		this._re_comp(com);
		
		//check implement
		if(this._re_interface){
			
			for(var i in this._re_interface){
				if(!this.hasOwnProperty(this._re_interface[i])){
					throw 'implementation: '+this._re_interface[i]+' missing';
				}
			}
			
		}
		
		//check asserts
		if(this._re_asserts){
			for(var t in this._re_asserts){
				if(this._re_comps.indexOf(c._re_asserts[t]) != -1){
					throw 'assert: '+c.name+' cannot be coupled with '+c._re_asserts[t];
				}
			}
		}
		
		return this;
	}
	
	p._re_comp = function(com){
		if(!com || com == '' || com == ' ') return this;
		
		//split a multi word string into smaller one word function calls
		var pieces;
		
		if(typeof com == 'object'){
			pieces = com;
			//set in case length is 1
			com = com[0];
		} else {
				pieces = com.split(' ');
		}
		
		if(pieces.length > 1){
			for(var k in pieces){
				this._re_comp(pieces[k]);	
			}
			
			return this;
		}
		
		//component reference
		var c;
		
		if(com.charAt(0) == '-'){
			//remove component
			
			com = com.substr(1);
			c = re._c[com];
			
			if(!this.has(com)) return this;
			
			//remove from array
			this._re_comps.splice(this._re_comps.indexOf(com), 1);
			
			//only remove if it exists
			if(c){
				
				if(c._re_dispose){
					c._re_dispose.call(this, c);
				}
				
				c.signal('dispose', this);
				
			}
			
			
		} else {
			var vals = com.split(':');
			
			com = vals[0];
			
			//add component
			c = re._c[com];
			
			//swap values
			vals[0] = c;
			
			//if already has component
			if(this.has(com)) return this;
			
			//add comp first thing, to avoid dupe requirement calls
			//and this lets the init remove the comp.
			this._re_comps.push(com);
			
			//add component only if it exists
			if(c){
				this._re_comp(c._re_requires);
				
				//add interface of component
				if(c._re_implements){
					if(!this._re_implements){
						this._re_implements = [];
					}
					this._re_implements = this._re_implements.concat(c._re_implements);
				}
				
				if(c._re_asserts){
					if(!this._re_asserts){
						this._re_asserts = [];
					}
					this._re_asserts = this._re_asserts.concat(c._re_asserts);
				}
				
				if(c._re_inherits){
					this.inherit(c._re_inherits);
				}
				
				if(c._re_defines){
					this.define(c._re_defines);
				}
				
				if(c._re_init){
					c._re_init.apply(this, vals);
				}
				
				c.signal('init', this);
			}
			
			
		}
	
		return this;
	}
	
	/*
	Returns component array
	*/
	p.getComps = function(){
		return this._re_comps.slice();
	}
	
	p.clone = function(count){
		return re.e(this._re_comps, count);
	}
	
	/*
	Calls methods of parent components.
	
	Use '' to call entities components when overriding
	*/
	p.parent = function(comp, method){
		
		var a = Array.prototype.slice.call(arguments, 2);
		
		if(comp == ''){
			re.e.init[method].apply(this, a);
		}
		
		var c = re._c[comp];
		
		if(c._re_defines[method]){
			return c._re_defines[method].apply(this, a);
		}
		
		if(c._re_inherits[method]){
			return c._re_inherits[method].apply(this, a);
		}
		
		return this;
	}
	
	/*
	TODO extend has to multiple item query
	
	//returns true if both present
	this.has('draw update');
	
	//return true if bitmap not present but has update
	this.has('update -bitmap');
	
	//returns true if has asset id and update signal
	this.has('#asset ^update');
	
	//expanded
	this.has({
		'comp':['draw'],
		'id':'bob',
		'signal':['draw'],
		'not':['update']
	});
	*/
	p.has = function(comp){
		
		if(typeof comp == 'string'){
			
			comp = re.query._toObj(comp);
		}
		
		comp.comp = comp.comp || [];
		comp.id = comp.id || '';
		comp.signal = comp.signal || [];
		comp.not = comp.not || [];
			
		//check if entitiy contains the correct components
		for(p=0; p<comp.comp.length; p++){
			
			//check if not containing components
			if(this._re_comps.indexOf(comp.comp[p]) == -1){
				return false;
			}
		}
		
		//check if entity doesn't contain components
		for(p=0; p<comp.not.length; p++){
			if(this._re_comps.indexOf(comp.not[p]) != -1){
				return false;
			}
		}
		
		var s;
		//check if entity contains signals
		for(p=0; p<comp.signal.length; p++){
			s = comp.signal[p];
			if(!this._re_signals[s] || this._re_signals[s].length == 0){
				return false;
			}
		}
		
		if(comp.id != '' && this.id != comp.id){
			return false;
		}
		
		
		return true;
	}
	
	/*
	singal can call events and add events to entities
	
	-adding signals
	this.signal('click', function(e){});
	this.signal('click draw', function(e){});
	this.signal({
		click: function(e){},
		draw:function(e){}
	});
	//listens to all signals
	this.signal('*', function(e){
		
	});
	
	//remove after first dispatch
	this.signal('!load', function(e){});
	
	//remove all click events and add back this event
	this.signal('-click click', function(e){
		
	});
	
	-dispatch signals
	this.signal('click');
	this.signal('click draw');
	this.signal('click', {data:0});
	
	-remove signals
	this.signal('-click');
	
	*/
	p.signal = function(type, method, con){
		if(arguments.length == 0 || type == undefined){
			throw 'Signal error Type variable undefined';
		}
		
		var c;
		if(typeof type == 'string'){
			c = type.split(' ');
			
			if(c.length > 1){
				
				var args = Array.prototype.slice.call(arguments, 1);
				
				for(var k in c){
					
					//add first arg
					args.unshift(c[k]);
					
					this.signal.apply(this, args);
					
					args.shift();
				}
				
				return this;
			}
		}
		
		 if(typeof type == 'object'){
			//map of events	to add
			
			for(var k in type){
				this.signal(k, type[k]);
			}
			
		} else if(type.charAt(0) == '-') {
			//remove signals
			
			type = type.substr(1);
			
			if(type == '*'){
				
				this._re_signals = {};
				
			} else if(method){
				//remove specific listener
				if(typeof method == 'function'){
					for(var k in this._re_signals[type]){
						if(this._re_signals[type][k].f == method){
							this._re_signals[type].splice(k, 1);
						}
					}
				} else {
					//this safeguards from sending in non-function variables by mistake!
					throw 'Cannot remove signal method '+method;
				}
				
			} else {
				
				this._re_signals[type] = [];
			}
			
		} else if(arguments.length >= 2 && method && typeof method == 'function'){
			//add signals
			var obj = {f:method};
			
			if(typeof con == 'object'){
				obj.c = con;
			}
			
			if(type.charAt(0) == '!'){
				obj.once = true;
				type = type.substr(1);
			}
			
			
			if(!this._re_signals[type]){
				this._re_signals[type] = [];
			}
			
			this._re_signals[type].push(obj);
			
		}  else {
			//dispatch signals
			if(!this._re_signals[type]){
				return this;	
			}
			var b;
			
			for(var i=0; i<this._re_signals[type].length; i++){
				
				b = this._re_signals[type];
				
				b[i].f.apply( (b[i].c)?b[i].c : this , Array.prototype.slice.call(arguments, 1));
				
				//remove after first use
				if(b.once){
					b.splice(i, 1);	
				}
				
				//* recieves all signals
				if(type != '*' && this._re_signals['*']){
					this.signal('*');
				}
				
			}
			
		}
		
		return this;
	}
	
	p.define = function(obj, value){
		
		if(typeof obj == 'object'){
			
			for(var key in obj){
				if(!obj.hasOwnProperty(key)) continue;
				
				this.define(key, obj[key]);
			}
			
		} else {
			//define property
			
			this[obj] = value;
		}
		
		return this;
	}
	
	p.inherit = function(obj, value){
		
		if(typeof obj == 'object'){
		
			for(var key in obj){
				if(!obj.hasOwnProperty(key)) continue;
				
				this.inherit(key, obj[key]);
				
			}
			
		} else {
			//extend property
			
			if(!this.hasOwnProperty(obj) || typeof this[obj] != typeof value){
				
				this[obj] = value;	
				
			}
		}
		
		return this;
	}
	
	p.dispose = function(){
		//delete from global array
		re._e.splice(re._e.indexOf(this), 1);
		
		for(var i in this._re_comps){
			var k = re.c(this._re_comps[i]);
			if(k._re_dispose){
				k._re_dispose.call(this, k);
			}
		}
		
		this.signal('dispose');
		
		return this;
	}
	
	re.entity = re.e = q;
	re.entity.init = e;
	
}(re));