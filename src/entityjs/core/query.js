(function(re){
	
	/*
	Searches through all entities using the selector conditions
	
	//identifiers
	* identifies all
	^ identifies a signal
	# identifies an id
	- identifies not
	
	//select all entities
	re('*');
	
	//select all entities with 2d and ai components
	re('2d ai');
	
	//select all 2d entities without the monster component
	re('2d -monster');
	
	//select all draw entities and entities with the id equal to asset
	re('draw #asset')
	//returns a random entity
	.random();
	
	//select all entities with id of bob and player
	//warning you cannot query for two ids
	re('#bob player')
	//takes values from all objects and returns an array
	.pluck('width height');
	
	//find all bitmap entities with update signal.
	re('bitmap ^update');
	
	//add color comp to all text components
	re('text').comp('color');
	
	//custom entity search
	re(function(index){
		
		if(entity.has('health') && entity.health > 0){
			//add to query
			return true;
		}
		
		//skip entity
		return false;
	})
	//calls reset method on all entities
	.method('reset');
	
	//returns direct reference to first entity with id of player
	re('#player').health = 100;
	
	*/
	var q = function(selector){
		this._e = [];
		
		if(selector){
			this.query(selector);
		}
	}
	
	/*
	Sort a query string into objects
	*/
	q._toObj = function(query){
		if(q.c[query]){
			return q.c[query];
		}
		
		//convert to object
		var temp = query.split(' ');
		var comps = [];
		var signals = [];
		var minus = [];
		var id = '';
		
		//split string
		var fl;
		var val;
		for(var j = 0; j<temp.length; j++){
			fl = temp[j].charAt(0);
			val = temp[j].substr(1);
			
			if(fl == '^'){
				signals.push(val);
			} else if(fl == '-'){
				minus.push(val);
			} else if(fl == '#'){
				id = val;
			} else {
				comps.push(temp[j]);
			}
		}
		
		var comp = {
			comp:comps,
			signal:signals,
			not:minus,
			id:id
		};	
		
		q.c[query] = comp;
		
		return comp;
	}
	
	q.c = {};
	
	var p = q.prototype;
	
	p.query = function(select){
		select = select || '';
		var i = 0;
		
		if(typeof select == 'string'){
			
			if(select == '*'){
				
				this._e = re._e.slice();
				
				return this;
			}
			
			//optimize search and cache
			var obj = q._toObj(select);
			
			var en;
			main : for(; i<re._e.length; i++){
				en = re._e[i];
				
				if(en.has(obj)){
				
					this._e.push(en);
				}
				
			}
			
			
		} else if(typeof select == 'function'){
			
			for(; i<re._e.length; i++){
				
				if(select.call(re._e[i], i)){
					this._e.push(re._e[i]);
				}
				
			}
			
		}
		
		return this;
	}
	
	/*
	Returns an array with all queried entities.
	*/
	p.toArray = function(){
		return this._e.slice();
	}
	
	/*
	Calls the given method name on all entities.
	
	re('enemies').method('rest');
	*/
	p.method = function(m){
		var b = Array.prototype.slice.call(arguments, 1);
		this.each(function(){
		
			this[m].apply(this, b);
		});
		
		return this;
	}
	
	/*
	example
	re('draw').each(function(index, length){
		
	});
	
	returning false will break the loop
	*/
	p.each = function(method){
		var l = this._e.length;
		
		for(var i=0; i<l; i++){
			if(method.call(this._e[i], i, l) == false) break;
		}
		
		return this;
	}
	
	/*
	The map method allows multidimensional loops.
	
	//map through and increase y every 3 entities.
	
	re('draw').map(3, function(x, y){
		this.x(x * width);
		this.y(Y * height);
	});
	
	//so instead of getting this back
	[e,e,e,e,e...]
	
	//you will get this
	[
	[e,e,e],
	[e,e,e],
	[e,e,e]
	...
	]
	
	returning false will break the loop
	
	*/
	p.map = function(w, method){
		var x = 0;
		var y = 0;
		
		for(var i =0; i<this._e.length; i++){
			
			if(method.call(this._e[i], x, y) == false) break;
			
			x++;
			
			if(x == w){
				x = 0;
				y++;	
			}
		}
	}
	
	/*
	Returns an array of all components in the query.
	*/
	p.compArray = function(){
		var l = [];
		
		this.each(function(){
			l.concat(this.compArray());
		});
		
		return l;
	}
	
	/*
	Returns a random entity.
	*/
	p.random = function(){
		return this._e[Math.random()*this._e.length];
	}
	
	/*
	The pluck method returns all values from all entities in an array.
	
	//will return all pos objs from all entities.
	re('point').pluck('pos visible');
	
	//if we echo...
	
	[
	{pos:0, visible:0}
	...
	]
	
	*/
	p.pluck = function(value){
		var t = [];
		
		var k = value.split(' ');
		
		this.each(function(){
			var o = {};
			
			for(var p in k){
				if(k.hasOwnProperty(p)){
					o[k[p]] = this[k[p]];
				}
			}
			
			t.push(o);
			
		});
		
		return t;
	}
	
	p.define = function(obj, value){
		this.each(function(){
			this.define(obj,value);
		});
		
		return this;
	}
	
	p.inherit = function(obj, value){
		this.each(function(){
			this.inherit(obj, value);
		});
		
		return this;
	}
	
	p.comp = function(c){
		
		this.each(function(ref){
			this.comp(c);
		});
		
		return this;
	}
	
	p.signal = function(type, method){
		var p = arguments;
		
		this.each(function(ref){
			this.signal.apply(this, p);
		});
		
		return this;
	}
	
	p.length = function(){
		return this._e.length;	
	}
	
	/*
	filters out entities that do not match credentials
	
	//spawns all entities that are dead
	re('2d health').filter(function(i){
		
		if(this.health <= 0){
			//keep entity
			return true;	
		}
		
		//remove entity
		return false;
		
	}).signal('spawn');
	
	*/
	p.filter = function(method){
		
		var q = re();
		var that = this;
		
		this.each(function(i){
			
			if(method.call(this, i)){
				//add entity
				q.push(this);
			}
			
		});
		
		return q;
	}
	
	p.has = function(comp){
		
		for(var i=0; i<this._e.length; i++){
			if(!this._e.has(comp)){
				return false;	
			}
		}
		
		return this;
	}
	
	p.dispose = function(){
		
		this.each(function(){
			
			this.dispose();
			
		});
		
		return this;
	}
	
	/*
	Get specific entity from given index.
	*/
	p.get = function(index){
		return this._e[index];
	}
	
	/*
	Put entity into query array.
	*/
	p.put = function(entity){
		
		this._e.push(entity);
		
		return this;
	}
	
	re.query = q;
	
}(re));