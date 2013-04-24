/* Entity Game Engine | MIT License */
re = function(selector){
	if(typeof selector == 'string'){
    if(selector[0] == '#'){
      //return tagged item
  	  return re._t[selector.slice(1)];
    } else {
      //return group
      return re._g[selector];
    }
	}

  //return array
  return new re.array(selector);
};

//contains all components
re._c = {};
//contains all systems
re._s = {};
//contains all groups
re._g = {};
//contains all tags
//tags are used to reference entities
re._t = {};

re.ready = function(r){
  re.listener('load', r);
};

/*
The $ method is used for selecting ids and tags.
*/
re.$ = function(s){
  return re.$._[s] = re.$._[s] || ((s.charAt(0) == '#') ? document.getElementById(s.substr(1)) : document.getElementsByTagName(s)[0]);
};
//caches dom queries
re.$._ = {};

re.$new = function(n){
  if(n)
    return document.createElement(n);
};

/*
Special polyfills and object additions
*/
re.listener = function(t, c, target){
  (target || window).addEventListener(t, c, true);
};

/*
Checks the existance of a variable or
*/
re.is = function(obj, type){
  if(arguments.length==1) return obj != null;

  return obj != null && Object.prototype.toString.call(obj).slice(8, -1).toLowerCase() == type.toLowerCase();
};
re.extend = function(){
	var out = {};
	for(var i in arguments){
		for(var b in arguments[i]){
			out[b] = arguments[i][b];
		}
	}
	return out;
};
/*
The base is the base class for system and group. Eventually will be the base for component too.
*/
re.base = function(){
    // base class
	this._re_listens = {};
};

re.base.extend = function(){
    var args = [].slice.call(arguments);
    args.unshift(re.base.prototype);
	return re.extend.apply(re, args);
};

re.base.extendArray = function(){
    var a = new Array;
    var args = [].slice.call(arguments);
    args.unshift(re.base.prototype);
    for(var i in args){
        for(var b in args[i]){
            a[b] = args[i][b];
        }
    }
    return a;
};

re.base.prototype = {

	tag:function(name){
		if(name!=null){
			//remove old
			re._t[this._tag] = null;
			
			return re._t[this._tag = name] = this;
		}
		return this._tag;
	},

    /*
    
    //single
    on('draw', function(){});
    
    //multiple
    on({
        
        draw:function(){},
        
        update:function(){}
        
    });
    */
    on:function(type, method, context, once){
        
        if(re.is(type, 'object')){
            
          for(var k in type){
            this.on(k, type[k], method, context);
          }
            
        } else {
            
            if(!this._re_listens[type]){
                this._re_listens[type] = [];
            }
            if(!re.is(method)) throw 'Method is null'
            //save context
            this._re_listens[type].push({c:context || this, f:method, o:once});
            
        }
        
        return this;
    },

    once:function(type, method, context){
        return this.on(type, method, context, 1);
    },
    
    /*
    Added in V0.2.1
    
    //remove bind from function
    off('draw', this.draw);
    
    //remove multiple
    off({ 
        draw:this.draw,
        update:this.update
    });
    
    //remove all keydown binds
    off('keydown')
    
    //remove all binds
    off()
    */
    off:function(type, method){
        
        if(re.is(type, 'object')){
            
            for(var k in type){
              if(type.hasOwnProperty(k))
                this.off(k, type[k]);
            }
            
        } else {
            
            if(method){
               var i = this._re_listens[type];
                for(var k in i){
                
                    if(i[k].f == method){
                        i.splice(k, 1);
                    }
                    
                }
            } else if(type){
                
                //no method was passed. Remove all signals
                this._re_listens[type] = [];
                
            } else {
                //remove all signals
                this._re_listens = {};
            }
        }
        
        return this;
    },
    
    /*
    Signal dispatches events to entities. 
    
    -dispatch signals
    this.trigger('click');
    this.trigger('click', 0);
    
    */
    trigger:function(type){
        
        if(!this._re_listens[type])    return this;
        var b;
        
        for(var i=0, l = this._re_listens[type].length; i<l; i++){
            
            b = this._re_listens[type];
            
            if(!b) break;
            if(!b[i]) continue;
            
            //return false remove or if is once listen
            if(b[i].f.apply(b[i].c, Array.prototype.slice.call(arguments, 1)) === false || (b[i] && b[i].o)){
                b.splice(i, 1);
            }
            
        }
        
        return this;
    },
    
    //setters / getters
    attr:function(obj, value){
        
        if(re.is(obj,  'object')){
            
          for(var key in obj){
                this.set(key, obj[key]);
            }
            
        } else {
            this[obj] = value;
        }
        
        return this;
    },

    set:function(obj, value){
        if(re.is(obj,  'object')){
            
          for(var key in obj){
                this.set(key, obj[key]);
            }
            
        }else {
          var k = 'function';
            //defines property
            if(re.is(this[obj], k) && !re.is(value, k)){
                if(re.is(value, 'array')){
                    this[obj].apply(this, value);
                } else {
                    this[obj].call(this, value);
                }
            } else {
                this[obj] = value;
            }
        }
        
        return this;
    },

    get:function(v){
        return (re.is(this[v], 'function'))? this[v]() : this[v];
    },

    def:function(obj, value){
        
        if(re.is(obj , 'object')){
        
          for(var key in obj){
              this.def(key, obj[key]);
            }
            
        } else {
            //defines property
            
            if(!re.is(this[obj])){
                
                this[obj] = value;    
                
            }
        }
        
        return this;
    }
};
/*
The array class extends the normal array with some goodies. To create a new array run: re().
*/
re.array = function(array){
	//add elements to this array
	if(array) this.push.apply(this, array);
};

re.array.prototype = re.base.extendArray({

		invoke:function(m){
	        var b = [].slice.call(arguments, 1);
	        return this.each(function(e){
	            e[m].apply(e, b);
	        });
		},

		each:function(m, context){
	      var l = this.length, i = -1, e;

	      while(++i < l && (e = this[i]) != null && m.call(context || this, e, i, this) !== false);

	      return this;
		},

		sample:function(){
			return this[(Math.random()*this.length)|0];
		},

		/*
	    The pluck method returns all values from all entities in an array.

	    //will return all pos objs from all entities.
	    re('point').pluck('pos visible');

	    //if we print...

	    [
	    {pos:0, visible:0}
	    ...
	    ]

	    */
		pluck:function(value){
	        var t = [];

	        var k = value.split(' ');

	        this.each(function(e){
	            var o = {};

	            for(var p in k){
	              var name = k[p];
	              o[name] = e[name];
	            }

	            t.push(o);

	        });

	        return t;
		},

		isEmpty:function(){
	      return !this.length;
		},

	    /*
	    Returns the first entity that passes the truth iterator method.

	    re('tile').find(function(e){
	      return e.tileX() == 0 && e.tileY() == 1;
	    });

	    */
		find:function(method, context){
			for(var i=0, l=this.length; i<l; i++){
	    	    if(method.call(context || this, this[i], i, this)) return this[i];
	      	}

	      	return null;
		},

		findAll:function(method, context){
			var args = new re.array();
			for(var i=0, l=this.length; i<l; i++){
	    	    if(method.call(context || this, this[i], i, this)) args.push(this[i]);
			};

			return args;
		},

	    /*
	    Returns the lowest entity from the given iterator.

	    var weakestRat = re('rat').min(function(e){
	      return e.health;
	    });

	    */
		min:function(method, context){
			var lowest = Infinity, val;
      this.each(function(e, i, l){
        var next = method.call(context || this, e, i, l);
        if(next < lowest){
          lowest = next;
          val = e;
        }

      });

      return val;
		},

		max:function(method, context){
		var lowest = -Infinity, val;
      this.each(function(e, i, l){
        var next = method.call(context || this, e, i, l);
        if(next > lowest){
          lowest = next;
          val = e;
        }
      });

      return val;
		},

		sum:function(method, context){
			var val = 0;

	        this.each(function(e, i, l){
	            val += method.call(context || this, e, i, l);
	        });
	        return val;
		},

		filter:function(){
			return re(Array.prototype.filter.apply(this, arguments));
		},

		reject:function(it, c){
	        for(var i=0; i<this.length; i++){
	            if(it.call(c || this, this[i], i, this)){
	                this.splice(i, 1);
	            }
	        }
	        return this;

		},

		/*
			Removes everything in group.
		*/
		clear:function(){
			this.length = 0;
			return this;
		},

		//disposes off all entities
		disposeAll:function(){
			var ents = this.slice();
			for(var i in ents){
				ents[i].dispose();
			}
			return this;
		},

		count:function(method, c){
			return this.findAll(method, c).length;
		},

		clone:function(){
			return this.slice();
		},

		contains:function(ref){
	      return !!~this.indexOf(ref);
		},

		/*
		Removes matched elements from array.

		re().remove(10);
		*/
		remove:function(ref){
	      for(var i=0; i<this.length; i++){
	        if(this[i] == ref) this.splice(i, 1);
	      }
	      return this;
		},

		removeAt:function(start, end){
			if(!end) end = start;
			for(var i = 0; i <= (end - start); i++) {
	        this.splice(start, 1);
	      }
			return this;
		},

		addAfter:function(target, ref){
	      this.splice(this.indexOf(target)+1, 0, ref);
	      return this;
		},

		addBefore:function(target, ref){
	      this.splice(this.indexOf(target), 0, ref);
	      return this;
		},

	    /*
	    Swaps the indexes of the given elements.
	    */
	    swap: function(ref1, ref2){
	      var ref1i = this.indexOf(ref1);
	      var ref2i = this.indexOf(ref2);

	      var t = this[ref1i];
	      this[ref1i] = ref2;
	      this[ref2i] = t;

	      return this;
	    },

		first:function(index){
			if(!index) return this[0];
			return this.slice(0, index);
		},

		last:function(index){
			if(!index) return this[this.length-1];
	      var start = this.length - index < 0 ? 0 : this.length - index;
	      return this.slice(start);
		}

});
    /*
    If component exists, the component will NOT be overwritten.

    @return component reference
    */
    re.comp = re.c = function(title, data){

        if(!re._c[title]){
            re._c[title] = new re.c.init(title);
        }

        //set data
        if(data){
            for(var i in data){
                re._c[title][i](data[i]);
            }
        }

        return re._c[title];
    };

    re.c.init = function(name){

        this.name = name;
        this._re_defaults = {};
        this._re_defines = {};
        this._re_events = {};
        this._re_setters = {};
        this._re_getters = {};

        //defines the special re.[comp]()
        if(!re[this.name]){
            var that = this;

            re[this.name] = function(){
                return that._re_method.apply(that, arguments);
            };

        }
    };

    /*
    p._re_requiress = null;

    p._re_init = null;

    p._re_dispose = null;

    p._re_asserts = null;

    p._re_interface = null;
    */

re.c.init.prototype = {
    /*
    Quick way to convert sentences to arrays.
    */
    z:function(n, r){

        if(!this[n]){
            this[n] = [];
        }

        if(re.is(r, 'string')){
            this[n] = this[n].concat(r.split(' '));
        } else {
            this[n] = this[n].concat(r);
        }

        return this;
    },

    //turns global method into a singleton
    singleton:function(name){
        this._re_method = function(){
            return this._singleton || (this._singleton = re.e(name||this.name));
        }
        return this;
    },

    /*
        Adds getter and setter for given attributes.
    */
    accessors:function(attrs){
        if(re.is(attrs,"string")) attrs = attrs.split(" ");

        var pri;
        for(var i in attrs){
            pri = "_"+attrs[i];

            this.getters(attrs[i], new Function("return this."+pri+";"));

            this.setters(attrs[i], new Function("v", "this."+pri+" = v;"));
        }
    },

    getters:function(obj, value){
        if(value){
            //single
            this._re_getters[obj] = value;
        } else {
            //multiple
            for(var i in obj){
                this._re_getters[i] = obj[i];
            }
        }
        return this;
    },

    setters:function(obj, value){
        if(value){
            //single
            this._re_setters[obj] = value;
        } else {
            //multiple
            for(var i in obj){
                this._re_setters[i] = obj[i];
            }
        }
        return this;
    },

    statics:function(obj, value){

        if(!re.is(value)){

            for(var type in obj){
                re[this.name][type] = obj[type];
            }

        } else {
            re[this.name][obj] = value;
        }

        return this;
    },

    events:function(obj, value){

      if(!re.is(value)){

          for(var type in obj){
              this._re_events[type] = obj[type];
          }

      } else {
          this._re_events[obj] = value;
      }

      return this;
    },

    /*
    Defines a more formal constructor for when references are needed.

    re.c('control')
    .factory(function(ref, val){
        this.ref = ref;
        this.val = val;
    });

    //new control entity
    re.control(val1, val2);

    */
    factory:function(f){

        this._re_factory = f;

        return this;
    },

    /*
    Controls the factory method flow.

    Will create a new entity and try to use the defined factory or else
    uses the default:

    //default factory
    re.circle({radius:10, color:"#ff0000"});

    */
    _re_method:function(){
        var e = re.e(this.name), f = this._re_factory;

        if(f)
            f.apply(e, arguments);
        else
            e.set.apply(e,arguments); //this is the default factory method

        return e;
    },

    /*
    Overwrites the factory method for a custom use.

    re.c('monster')
    .method(function(){
        return re('monster');
    });

    re.monster(); //calls method

    */
    method:function(f){
        this._re_method = f.bind(re[this.name]);
        return this;
    },

    requires:function(r){
        return this.z('_re_requires', r);
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

    /*
    Default adds onto but doesn't overwrite values.
    */
    defaults:function(d, value){

        if(arguments.length == 1){

            for(var k in d){
                this._re_defaults[k] = d[k];
            }

        } else {

            this._re_defaults[d] = value;

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
    namespaces:function(obj, value){
        var name = this.name+'_';

        if(arguments.length == 1){

            for(var k in obj){
                this._re_defines[name+k] = obj[k];
            }

        } else {
            this._re_defines[name+obj] = value;
        }

        return this;
    },

    /*
    defines overrides everything.
    */
    defines:function(d, value){

        if(arguments.length == 1){

            for(var k in d){
                this._re_defines[k] = d[k];
            }

        } else {
            this._re_defines[d] = value;
        }

        return this;
    },

    init:function(method){

        this._re_init = method;

        return this;
    },

    dispose:function(method){

        this._re_dispose = method;

        return this;
    },

    /*
    The run method allows a function to be ran in the context
    of the component.

    Useful to keep everything in one big component.
    */
    run:function(method){

        //re.ready(function(){
            method.call(this);
        //});

        return this;
    }

};
(function(re){

    /*
    Main function for re.e

    //create entity
    re.e('spider');

    */
    var q = function(c){
        return new re.entity.init(c);
    };

    var e = function(c){

        this._re_comps = [];
        this._re_listens = {};

        this.comp(c);
    };

    var p = e.prototype = re.base.extend({});

    /*
    //add components
    this.comp('point text');

    this.comp('health physics');

    //remove components
    this.removeComp('point');
    */
    p.comp = function(com){

        if(!com) return this;

        //split a multi word string into smaller one word function calls
        var pieces;

        //handle array or string?
        if(re.is(com, 'array')){
            pieces = com;
        } else {
            pieces = com.split(' ');
        }

        for(var i =0; i<pieces.length; i++){
            com = pieces[i];

            if(!com) return this;

            //if already has component
            if(!this.has(com)){

            //component reference
            var c = re._c[com], k;

            //add comp first thing, to avoid dupe requirement calls
            //and this lets the init remove the comp too.
            this._re_comps.push(com);

            //init component only if it exists
            if(c){
                this.comp(c._re_requires);

                //add getters / setters
                for(k in c._re_setters){
                    this.__defineSetter__(k, c._re_setters[k]);
                }
                for(k in c._re_getters){
                    this.__defineGetter__(k, c._re_getters[k]);
                }

                if(c._re_defaults){
                    this.def(c._re_defaults);
                }

                if(c._re_defines){
                    this.set(c._re_defines);
                }

                if(c._re_events){
                  this.set(c._re_events)
                  .on(c._re_events);
                }

                if(c._re_init){
                    c._re_init.call(this);
                }
            }

            //add to group
            if(re._g[com]) re._g[com].add(this);

        }
      }


        return this;
    };

    p.removeComp = function(com){

        var pieces;

        //handle string or array?
        if(re.is(com,'array')){
            pieces = com;
        } else {
            pieces = com.split(' ');
        }

        if(pieces.length > 1){

          var k;
          while(k = pieces.shift()){
            this.removeComp(k);
          }

            return this;
        } else {
          com = pieces[0];
        }

        if(com && this.has(com)){
          var c = re._c[com];
          //only remove if it exists
          if(c){

              if(c._re_dispose){
                  c._re_dispose.call(this, c);
              }

          }

          //remove from group
          if(re._g[com]) re._g[com].remove(this);

          //remove from array
          this._re_comps.splice(this._re_comps.indexOf(com), 1);
        }
        return this;
    };

    /*
    Returns component array
    */
    p.comps = function(){
        return this._re_comps.slice();
    }

    p.clone = function(){
        return re.e(this._re_comps);
    }

    /*
    Calls methods of parent components.

    Use '' to call super of entity

    re.e('draw')
    ._super('draw', 'screenX')()

    */
    p._super = function(comp, method){

        var a = Array.prototype.slice.call(arguments, 2);

        if(comp == ''){
            //call entity parent methods
            return re.e.init.prototype[method].apply(this, a);
        }

        var c = re._c[comp];

        if(c._re_defines[method]){
            return c._re_defines[method].apply(this, a);
        }

        return c._re_defaults[method].apply(this, a);
    }

    /*
    TODO defines has to multiple item query

    this.has('draw');

    //returns true if both present
    this.has('draw update');

    */
    p.has = function(comp){

        if(re.is(comp ,'string')){

            comp = comp.split(' ');
        }

        //check if entitiy contains the correct components
        for(p=0; p<comp.length; p++){

            //check if not containing components
            if(!~this._re_comps.indexOf(comp[p])){
                return false;
            }
        }

        return true;
    };


    p.dispose = function(){

        //trigger dispose on all components
        //remove from groups too
        this.removeComp(this.comps());

        this.trigger('dispose');

        //remove all events
        return this.off();
    }

    re.entity = re.e = q;
    re.entity.init = e;

}(re));
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
(function(re){
    
  var b = function(assets){
        return new re.load.init(assets);    
    }
    
    b.path = "";
    //returns file name of path
    b.file = function(name){
      return name.split('/').pop().split('?').shift();
    };
    
    b.imageExt = 'img';
    b.soundExt = 'sfx';
    b.images = ['gif', 'jpg', 'jpeg', 'png'];
    b.sounds = ['wav', 'mp3', 'aac', 'ogg'];
    
    /*
    Loads images, sounds and other files into components.
    
    All loaded assets will be put into a component with a ref to the asset.
    
    //example of loading assets
    re.load('tiles.png add.js attack.mp3')
    .complete(function(arrayOfAssets){
        //create new bitmap of tiles.png
        re.e('bitmap tiles.png');
        
        //new sound
        re.e('sound attack.mp3');
        
        //access image staticaly or localy
        re.comp('tiles.png').image;
        re.entity('tiles.png').image;
        
    })
    .error(function(assetThatCausedError){
        //error
    })
    .progress(function(current, total, assetLoaded){
        //called on loads
    });
    
    @warning only supports loading images and sounds
    
    //load sound
    
    //re.support will return the supported codec
    re.load('run.'+re.support('ogg', 'aac'));
    
    FUTURE remove directories from calls
    
    */
    var l = function(assets){
        
        if(re.is(assets,'string')){
          this.assets = assets.split(' ');
          
        } else if(re.is(assets,'object')){
          this.assets = [];
          for(var i in assets){
            
            if(re.is(assets[i], 'array')){
              this.assets = this.assets.concat(assets[i]);
            }
            
          }
        } else {
          
          this.assets = assets;
        }
        
        var a;
        for(var i=0; i<this.assets.length; i++){
            
            this.total++;
            
            a = this.assets[i];
            
            //copy full source path
            var s = (a.match(/^(\/|http:)/))?a:re.load.path+a;

            //remove directories
            a = re.load.file(a);
            
            //find file extension
            var j = a.lastIndexOf('.')+1;
            var ext = a.substr(j).toLowerCase();
            
            //find name
            var n = a.substr(0, j);
            
            if(re.load.images.indexOf(ext) != -1){ //make sure image is allowed

                this._loadImg(s, a, n);
                
            } else if(re.load.sounds.indexOf(ext) != -1){ //make sure sound is allowed
                
                //soundmanager only supports mp3, so use it if the sound is mp3
                if(window['soundManager'] && ext == 'mp3' || re.support(ext)){
                  //don't load the same sound twice
                  if(re._c[n+re.load.soundExt]){ 
                    //remove from array
                    this.total--;
                    continue;
                  } else {
                   this._loadSound(s, a, n);
                  }
                } else {
                  //sound can't be loaded
                  this.total--;
                  continue;
                }
                
            }
            
            
        }
        
        return this;
    }
    
    var p = l.prototype;
    
    p.current = 0;
    p.total = 0;
    
    //src - full path to image
    //a - image name
    //n - image name without ext
    p._loadImg = function(src, a, n){
        var that = this;
        var img = new Image();
        
        //create new image component
        re.c(a)
        .alias(n+re.load.imageExt)
        .defines({
            //save image for other components to copy or use
            _image:img
        }).image = img;
        
        img.onload = function(){
          re.c(a).defines({
            sizeX:img.width,
            sizeY:img.height,
            bisect:img.width
          });
          
          that._loaded();
        };
        img.crossOrigin = '';
        
        img.onerror = function(){
            
            if(that._e){
                that._e.call(that, a);
            }
            
        };
        
        img.src = src;
        
        return this;
    };
    
    p._loaded = function(){
      this.current++;
      
      if(this.current <= this.total){
        if(this._p){
            this._p(this.current, this.total, this.assets[this.current-1]);
        }
      }
      if(this.current == this.total){
          if(this._s){
            this._s(this.assets);
          }
        }
    };
    
    /*
    src - original string
    a - filename
    n - filename without extension
    */
    p._loadSound = function(src, a, n){
        var that = this, s;
        
        if(window['soundManager']){
          //use soundmanager!
          
          soundManager.onready(function(){
          
            s = soundManager.createSound({
              id:a,
              url:src,
              autoLoad:true,
              onload:function(){
                that._loaded();
              }
            });
          
            that._def_sfx(s, a, n);
        
          });
        
        } else {
          s = new Audio();
          s.preload = "auto";
          s.load();
          
          //called multiple times in firefox
          var f = function(){
            that._loaded();
            //remove after first call
            s.removeEventListener('canplaythrough', f);
            };
            
          s.addEventListener('canplaythrough',f,false);
          
          s.addEventListener('error',function(){
              
              if(that._e){
                  that._e.call(that, a);
              }
          },false);
          
          s.src = src;
          
          this._def_sfx(s, a, n);
        
        }
        
    }
    
    p._def_sfx = function(s, a, n){
      
      re.c(a)
      //create static codec for easy use
      .alias(n+re.load.soundExt)
      .defines({
          _sound:s
      }).sound = s;
    }
    
    p.progress = function(m){
        
        this._p = m;
        
        return this;
    }
    
    p.complete = function(m){
        
        this._s = m;
        
        //call complete if empty
      if(!this.assets.length){
        m([]);
      }
    
        return this;
    }
    
    p.error = function(m){
        
        this._e = m;
        
        return this;
    }
    
    re.load = b;
    re.load.init = l;
    
}(re));
/*
The main component contains all information and references to the entity js engine.
Such as the canvas context, fps, start, stop, canvas.

You can add the component to entities for quick reference to variables.

*/
re.c('loop')
.singleton()
.defaults({

    clearColor:'#f9f9f9',

    stepSize:0.03,
    maxTick:0.05,

    running:false,

    sizeX:10,
    sizeY:10

})
.defines({

    clear:function(color){

        if(color){
            this.context.fillStyle = color;
            this.context.fillRect(0, 0, this.sizeX, this.sizeY);
        } else {
            this.context.clearRect(0, 0, this.sizeX, this.sizeY);
        }

        return this;
    },

    start:function(){
        if(!this.running){
            this.running = true;

            var that = this,
            m;
            (m = function(){

              that.loop();

              if(that.running){
                that.requestAnimationFrame(m, that.canvas);
              }
            })();

        }

        return  this;
    },

    stop:function(){
        this.running = false;
        return this;
    },

    //scale is currently not implemented!
    init:function(canvasId, contextType){

        //add comps here because main is defined earlier than other comps
        this.comp('polyfill tick timestep');

        //setup canvas
        if(re.is(canvasId, 'htmlcanvaselement')){
          this.canvas = canvasId;
        } else {
          this.canvas = re.$(canvasId);
        }

        this.context = this.canvas.getContext(contextType || '2d');

        var s = re.screen();

        this.sizeX = s.sizeX = this.canvas.width;
        this.sizeY = s.sizeY = this.canvas.height;

        this.second = this.stepSize * 30;

        this.initSystems();

        return this;
    },

    initSystems:function(){
        //init systems
        this.keyboardSys = re.s('keyboard').create();
        this.mouseSys = re.s('mouse').create(this.canvas);

        this.renderSys = re.s('render').create(this.context);
        this.updateSys = re.s('update').create();
    },

    /*
    Default main loop
    */
    loop:function(){

        this.timestep(Math.min(this.tick() / 1000, this.maxTick), function(){
            //update
            this.update();
        });

        this.draw();
    },

    update:function(){
        this.updateSys.processAll();
    },

    draw:function(){
        //clear
        this.clear(this.clearColor);
        this.renderSys.processAll();
    }

});

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
/*
The tick component is a stop watch cyclier. It will return the milliseconds in time
between tick() calls.

var tick = re.e('tick');
//wait 200 milliseconds
tick.tick(); //200
//wait 10 milliseconds
tick.tick(); //10
*/
re.c('tick')
.init(function(){
	this.lastTime = Date.now();
})
.defines({

	tick:function(){
		var wall = Date.now();
		var last = this.lastTime;
		this.lastTime = wall;
    
		return wall - last;
	}
	
});
/*
The tween component tweens properties of entities to the given value over a period of time.

This is useful for animations.

re.e('tween')
.tween(800, {x:10})
.wait(500)

EVENTS:
tween:start
tween:finish
tween:update

*/
re.c('tween')
.requires('update')
.namespaces({

	update:function(t){
		if(!this.tweening) return;
		
    this.tween_time += t;
    
    var elapsed = this.tween_time / this.tween_t;
    
    if(elapsed > 1) elapsed = 1;
    
    //easing function
    value = this.tweenEase(elapsed);
    
    //advance
    for(var i in this.tween_d){
      
      //set deltas
      var ease = this.tween_s[i] + this.tween_d[i] * value;

      this.set(i, ease);
    }
    
    this.trigger('tween:update', value);
    
    if(elapsed == 1){
      
      this.tweening = false;
      
      this.off('update', this.tween_update);
      
      this.trigger('tween:finish');
    }
    
	}

})
.defaults({
	
	tweening:false,
  
  tweenEase:function(v){
    return v;
  }
	
})
.defines({
	
	tween:function(time, props){
    
    //accepts ms or seconds
    if(time >= 100){
      time /= 1000;
    }
    
    //TODO: fix this, probably move into system
    var maxTime = (time || 1) / re.loop().second;
    this.tween_time = 0;
    //steps are substracted until it reaches zero
    
    var deltas = {};
    var starts = {};
    for(var i in props){
      var value = this.get(i);
      
      deltas[i] = props[i] - value;
      starts[i] = value;
    }
    
    //tween initial values
    this.tween_s = starts;
    //tween deltas
    this.tween_d = deltas;
    //tween maximum time
    this.tween_t = maxTime;
    
    if(!this.tweening){
      this.on('update', this.tween_update);
    }
    
    this.tweening = true;
    
    return this.trigger('tween:start', starts);
	}
  
});

re.tween = function(obj, time, props){
  return obj.comp('tween').tween(time, props);
};
/*
The update component calls update signals to all listening entities.
*/
re.c('update')
.defaults({
	updatable:true
});
/*
The align component contains helper methods for positioning entities relative to system size.

@warning aligning with negative values will not round down but up!

*/
re.c('align')
.defaults({
    regX:0,
    regY:0,
    sizeX:1,
    sizeY:1,
    posX:0,
    posY:0
})
.defines({

    align:function(x, y){
        this.alignHor(x);
        return this.alignVer(y);
    },

    alignHor:function(o){
        o = o || 0;
        this.set('posX', re.loop().sizeX * 0.5 - (this.get('sizeX') - this.get('regX'))*0.5 + o | 0);

        return this;
    },

    alignVer:function(o){
        o = o || 0;
        this.set('posY', re.loop().sizeY * 0.5 - (this.get('sizeY') - this.get('regY'))*0.5 + o | 0);
        return this;
    },

    alignRight:function(x){
        x = x || 0;
        this.set('posX', re.loop().sizeX - (this.get('sizeX') - this.get('regX')) + x | 0);
        return this;
    },

    alignLeft:function(x){
        x = x || 0;
        var s = this.get('sizeX');
        this.set('posX', x + s - (s - this.get('regX')) | 0);
        return this;
    },

    alignTop:function(y){
        y = y || 0;
        var s = this.get('sizeY');
        this.set('posY', y + s - (s - this.get('regY')) | 0);
        return this;
    },

    alignBottom:function(y){
        y = y || 0;
        this.set('posY', re.loop().sizeY - (this.get('sizeY') - this.get('regY')) + y | 0);
        return this;
    }

});
/*
The animate comp defines a simple interface for animating sprites.

//create entity with sprite sheet and animate comp
var apple = re.e('apple.png animate sprite');

//setup animations to play
apple.animates = {
			//time, frames, loops
	explode:[1000, [0, 1, 2], 1]
		  //seconds, frames, loops defaults to once
	trans:[0.5, [3, 4, 5]]
};

//play animation
apple.animate('explode');

//stop animation
apple.animate();

//check animation playing
apple.flickering(); //this comes from flicker comp

*/
re.c('animate')
.requires('flicker')
.defines({

  //overload flickers method
	flicker_stop:function(){
		this._super('flicker', 'flicker_stop');
		if(this.animate_finish) this.animate_finish();
	},

	animate:function(name, onFinish, onUpdate){
		//ignore if calling the same animation
		if(this.flickering() != name){

        	this.animate_finish = onFinish;
        	this.animate_update = onUpdate;

			var a = this.animates[name];
			//flicker interface
			//(duration:int, frames:array, loops:int, id:string)
			this.flicker(a[0], a[1], a[2], name);

			//only run if a is defined
			if(a.push)
				this.flicker_run(); //run first frame
		}
		return this;
	},

	animating:function(t){
		return this.flickering(t);
	},

  //implement for flicker
  flick:function(c){
      this.frame(c);
      if(this.animate_update)  this.animate_update.apply(this, arguments);
  }

});
/*
The circle component draws a rectangle on screen.
*/
re.c('circle')
.requires('draw')
.defaults({
    color:'#82d5f4'
})
.defines({
    
    draw:function(c){
        
        c.fillStyle = this.color;
        
        c.beginPath();
            var r = this.get('radius');
            
            c.arc(-this.regX + r , -this.regY + r , r, 0, Math.PI*2, true);
        
        c.closePath();
        
        c.fill();
        
        return this;
    },
    
    radius:function(r){
        if(re.is(r)){
            this.sizeX = this.sizeY = r * 2;
            return this;
        }
        return this.sizeX * 0.5;
    }
    
});
/*
The draw component defines draw properties on an entity.
*/
re.c('draw')
.defaults({

    screenable:true,
    drawable:true,
    rotation:0,
    alpha:1,

    scaleX:1,
    scaleY:1,

    posX:0,
    posY:0,

    sizeX:10,
    sizeY:10,

    regX:0,
    regY:0

})
.defines({

    screenX:function(x){
        if(x){
            this.posX = x + re.screen().posX;
            return this;
        }
        return this.posX - re.screen().posX;
    },

    screenY:function(y){
        if(y){
            this.posY = y + re.screen().posY;
            return this;
        }
        return this.posY - re.screen().posY;
    },

    /*
    Returns true or false wether the object is visible on screen.
    */
    visible:function(){

        return this.drawable && re.screen().hit(this.posX, this.posY, this.sizeX, this.sizeY, this.regX, this.regY);

    }

});
/*
The element comp creates and displays DOM elements. This can be used to display buttons,
images, icons etc. on top of the canvas element.

re.e('el').$el //jquery element reference

El requires Jquery / Zepto

*/
re.c('el')
.requires('align')
.defines({

  posX:function(x){
    if(re.is(x)){
      this.$el.css('left', x);
      return this;
    }

    return this.$el.position().left;
  },

  posY:function(y){
    if(re.is(y)){
      this.$el.css('top', y);
      return this;
    }
    return this.$el.position().top;
  },

  sizeX:function(){
    return this.$el.outerWidth();
  },

  sizeY:function(){
    return this.$el.outerHeight();
  },

  click:function(f){
    var that = this;
    this.$el.click(function(e){
      f.call(that,e);
    });
    return this;
  },

  $:function(a,b){
    return this.$el.find(a,b);
  },

  setEl:function(el){
    this.removeEl();

    //create element if string
    if(re.is(el, 'string')){
      el = re.$new(el);
    }

    this.el = el;
    this.$el = $(el).addClass('el');

    this.posX(0);
    this.posY(0);
    return this;
  },

  text:function(t){
    if(re.is(t)){
      this.$el.text(t);
      return this;
    }
    return this.$el.text();
  },

  //places element to parent of canvas
  addEl:function(targ){
    targ = targ || $(re.loop().canvas).parent();

    targ.append(this.el);
    return this;
  },

  removeEl:function(){
    if(this.$el){
    	this.$el.remove();
    }
    return this;
  },

  hide:function(){
    this.$el.hide();
    return this;
  },

  show:function(){
    this.$el.show();
    return this;
  }

})
.init(function(){
  this.setEl('div');
})
.dispose(function(){
  this.removeEl();
});
/*
The image component draws an image on screen.


FUTURE - add imagedata component for image manipulation.
*/
re.c('image')
.requires('draw')
.defines({
	
	image:function(b){
        if(re.is(b)){
            this.set({_image:b, sizeX:b.width, sizeY:b.height, bisect:b.width});
        	return this;
        }
        return this._image;
	},
	
	visible:function(){
		return this._image && this._super('draw', 'visible');
	},
	
	draw:function(c){
		c.drawImage(this._image, -this.regX, -this.regY, this.sizeX, this.sizeY);
		return this;
	}
	
})
.init(function(){
	
	if(this._image){
		this.image(this._image);
	}
	
});
/*
The imgfont component writes text on the screen using a sprite image.
This is a faster approach than using the text component for now.
Plus you don't have to worry about the font not being supported.

@usage
//Must be created as a component to implement the imgtext array.
//imgtext is an array of all characters and defines the width
//of each.

re.c('serif')
.requires('imgtext font serif.png')
.defines('imgtext', [4,4,2,4,3,5,6,7,8,3,4,5])

re.e('serif')
.text('This displays on screen')

//find all fonts
re('font')

*could be turned in to a special sprite component but wouldn't
be very useful.


*/

re.c('imgtext')
.requires('draw')
.defaults({
  //remove empty characters in ascii
	charOffset:32,
	lineHeight:15
})
.defines({
	
	visible:function(){
		return this._text && this._image && this._super('draw', 'visible');
	},
	
	draw:function(c){
	  
    for(var i=0; i<this.text_lines.length; i++){
      this.drawText(c, this.text_lines[i], i * this.lineHeight);
    }
		
	  return this;
	},
	
  drawText:function(c, text, yPos){
    
		var slot = 0, charWidth, code, charPos;
		
		for(var i=0, l = text.length; i<l; ++i){
			
			//get char code
			code = text.charCodeAt(i) - this.charOffset;
			
			//find width of character
			charWidth = this.imgtext[code];
			
			//find source character position
			if(!this.charCache[code]){
				charPos = 0;
				for(var p=0; p<code; ++p){
					charPos += this.imgtext[p]+1;
				}
				this.charCache[code] = charPos;
			}
			
			c.drawImage(this._image, this.charCache[code], 0, charWidth, this._image.height, -this.regX + slot, -this.regY + yPos, charWidth, this._image.height);
			
			//append to next character slot
			slot += charWidth;
			
		}
  },
  
	text:function(t){
		if(re.is(t)){
  		this._text = t;
      
      this.text_lines = this._text.split('\n');
      
  		this.sizeX = 0;
  		
      //find the longest line and set that as the width
      for(var i in this.text_lines){
    		var w = 0;
    		//TODO size is slightly off 
    		for(var p=0; p<this.text_lines[i].length; p++){
    			w += this.imgtext[p];
    		}
        if(w > this.sizeX){
          this.sizeX = w;
        }
      }
  		
      this.sizeY = this.text_lines.length * this.lineHeight;
      
      return this;
    }
		return this._text;
	}
	
})
.init(function(){
	
	if(!this.charCache){
		this.charCache = {};
	}
	this.text('');
});
/*
The rect component draws a rectangle on screen.
*/
re.c('rect')
.requires('draw')
.defaults({
	color:'#82d5f4'
})
.defines({
  
  draw:function(c){
		
		c.fillStyle = this.color;
		
		c.fillRect(-this.regX, -this.regY, this.sizeX, this.sizeY);
		return this;
	}
  
});
/*
The screen component is used for scrolling or shaking all visible objects. 
It simply offsets pos values upon rendering.

This is useful for setting up a tile-based game.
*/
re.c('screen')
.singleton()
.requires('hit')
.defines({
    
    pos:function(x, y){
      if(!arguments.length){
        return this;
      }
      if(re.is(x,'object')){
        y = x.posY;
        x = x.posX;
      }
      
      this.posX = x - this.regX - this.offX;
      this.posY = y - this.regY - this.offY;
      
      return this;
    },
    
    toScreenX:function(x){
        return x + this.posX - this.offX - this.regX;
    },
    
    toScreenY:function(y){
        return y + this.posY - this.offY - this.regY;
    }
    
})
.defaults({
    
    posX:0,
    posY:0,
    
    regX:0,
    regY:0,
    
    sizeX:0,
    sizeY:0,
    
    offX:0,
    offY:0
    
});
/*
The sprite object definess a drawable image for an entity.

@usage
var sprite = re.e('sprite player.png');

//move to frame 3
sprite.frame(3)

//get current frame
sprite.frame()

//manually move to frame
sprite.set({frameX:0, frameY:1});

//add animation
sprite.comp('flicker')
//add animation
sprite.flicker('run', -1, 400, [0, 2, 3, 4])
//play
sprite.flicker('run')
*/

re.c('sprite')
.requires('image bisect')
.defaults({

    frameX:0,
    frameY:0

})
.defines({

    frame:function(i){
      if(re.is(i)){
        this.frameX = this.biToTileX(i);
        this.frameY = this.biToTileY(i);
        return this;
      }
      return this.tileToBi(this.frameX, this.frameY);
    },

    draw:function(c){
        c.drawImage(this._image, this.frameX * this.sizeX, this.frameY * this.sizeY, this.sizeX, this.sizeY, -this.regX, -this.regY, this.sizeX, this.sizeY);

        return this;
    }

});
/*
The text component displays font on screen using the canvas font api.

//create font
re.e('text')
.defines({
	text:'Texting Message',
	textColor:'#ff0000'
});

TODO implement size

*/
re.c('text')
.requires('draw')
.defaults({
	font:"14px sans-serif",
	textColor:'#000000',
	textAlign:'left',
  textBaseline:'top',
  lineHeight:15
})
.defines({
	
	visible:function(){
		return this._text && this._super('draw', 'visible');
	},
	
	text:function(t){
    if(re.is(t)){
      //convert to string
      t = Array.prototype.join.call(arguments, ' ');
      
      this.text_lines = t.split('\n');
  		this._text = t;
      //set text width
      if(re.loop().context){
        var c = re.loop().context;
        c.save();
        c.font = this.font;
        
        this.sizeX = 0;
        
        var w = 0;
        for(var i in this.text_lines){
          w = c.measureText(this.text_lines[i]).width;
          if(w > this.sizeX){
            this.sizeX = w;
          }
        }
        
        c.restore();
      }
      
      //set height
      this.sizeY = this.text_lines.length * this.lineHeight;
      
      return this;
    }
		return this._text;
	},
	
	draw:function(c){
		
		c.font = this.font;
		c.fillStyle = this.textColor;
    c.textAlign = this.textAlign;
    c.textBaseline = this.textBaseline;
    
    //multi-line
    var lines = this.text_lines;
    for(var i=0, l=lines.length; i<l; i++){
  		c.fillText(lines[i], -this.regX, -this.regY + (i * this.lineHeight));
    }
    
		return this;
	}
	
});
/*
The keyboard component allows an entity to listen for keyboard events.

@usage
re.e('keyboard')
.on('keydown', function(key, event){
  re.log('keydown', key, event);
})
.on('keyup', function(key, event){
  re.log('keyup', key, event);
});

*/
re.s('keyboard')
.defines({
    focusStop:true,
	
	keyCodes: { 
    /* start the a-z keys */
    65 : 'a',
    66:'b',
    67:'c',
    68:'d',
    69:'e',
    70:'f',
    71:'g',
    72:'h',
    73:'i',
    74:'j',
    75:'k',
    76:'l',
    77:'m',
    78:'n',
    79:'o',
    80:'p',
    81:'q',
    82:'r',
    83:'s',
    84:'t',
    85:'u',
    86:'v',
    87:'w',
    88:'x',
    89:'y',
    90:'z',
    /* start number keys */
    48:'0',
    49:'1',
    50:'2',
    51:'3',
    52:'4',
    53:'5',
    54:'6',
    55:'7',
    56:'8',
    57:'9',
    /* start the f keys */
    112:'f1',
    113:'f2',
    114:'f3',
    115:'f4',
    116:'f5',
    117:'f6',
    118:'f7',
    119:'f8',
    120:'f9',
    121:'f10',
    122:'f11',
    123:'f12',
    /* start the modifier keys */
    16:'shift',
    17:'ctrl', //mac os - control
    18:'alt',//mac os key - option opt
    24:'cmd', //Mac OS key - also command
	255:'fn',//lenovo - function
    /* Misc. Keys */
    8:'backspace',
    13:'enter', //max os - return
    32:'space',
    27:'esc',
    9:'tab',
    20:'capslock',
    91:'windows',//mac os - super
    46:'delete', //NOT THE OS X DELETE KEY!
    36:'home',
    35:'end',
    33:'pageup',
    34:'pagedown',
    /* Arrow keys */
    37:'left',
    38:'up',
    39:'right',
    40:'down',
    /* Special char keys */
    96:'`',
    45:'-',//also insert on mac?
    187:'=',
    219:'[',
    221:']',
    220:'\\', //it's actually a \ but there's two to escape
    59:';',
    222:"'",
    188:',',
    190:'.',
    191:'/'
	},
	
	event: function(e){
		
        var tagName = (e.target || e.srcElement || {}).tagName;
    
        //disable keyboard keys if focus lost
		if(this.focusStop && tagName && tagName.match(/INPUT|SELECT|TEXTAREA/)){
			return;
		}
		
		var c = e.keyCode || e.which;
    
		var key = this.keyCodes[c];
		
        return this.key(key, e.type, e);
	},

    key:function(key, keytype, event){

        if(re.pressed && re.pressed.d){
            re.pressed.d[key] = keytype == 'keydown';
        }
    
        if(re.preventDefault && re.preventDefault.d[key]){
            event.preventDefault();
        }
    
        for(var k=0; k<this.entities.length; k++){
            this.entities[k]
            .trigger(keytype, key, event)
            .trigger(keytype+':'+key, key, event);
        }
        
        return this;
    }

})
.init(function(){
    this.entities = re.g('keyboard').create();

    re.listener('keydown', this.event.bind(this));
    re.listener('keyup', this.event.bind(this));

    //reset all keys
    re.listener('focus', function(){
      re.pressed.d = {};
    });
});
/*
The mouse system listens for mouse events and triggers events on all mouse entities. This should be overwritten for more advanced functionality.

@usage
re.e('mouse')
.on('mousedown:middle', function(x, y){
    //x - x position
    //y - y position

    //convert to screen position
    re.screen.toScreenX(x);
});

*/
re.s('mouse')
  .defines({

  press: function(e) {
    var b, c;

    //find which key
    if (e.which == null) {
      //IE
      if (e.button < 2) {
        b = 'left';
      } else if (e.button == 4) {
        b = 'middle';
      } else {
        b = 'right';
      }
    } else {
      if (e.which < 2) {
        b = 'left';
      } else if (e.which == 2) {
        b = 'middle';
      } else {
        b = 'right';
      }
    }

    c = 'mouse:' + b;

    this.event(e, c);

  },

  event: function(e, extra) {

    var canvas = this.canvas;
    //calculate mouse coordinate
    var x = canvas.width / canvas.offsetWidth;
    var y = canvas.height / canvas.offsetHeight;

    //calculate offset
    if (e.offsetX != null) { //chrome, opera
      x *= e.offsetX;
      y *= e.offsetY;
    } else { //firefox
      x *= e.layerX - canvas.offsetLeft;
      y *= e.layerY - canvas.offsetTop;
    }

    return this.mouse(x, y, e.type, extra, e);
  },

  mouse: function(x, y, type, button, event) {

    //register mouse action
    if (re.pressed && re.pressed.d) {
      re.pressed.d["mouse:" + button] = type == 'mousedown';
    }

    return this.processAll(x, y, type, button, event);
  },

  processX: function(e, x) {

    //offset mouse coordinates
    return x + this.offX;
  },

  processY: function(e, y) {

    //offset mouse coordinates
    return y + this.offY;
  },

  process: function(e, x, y, type, button, event) {

    x = this.processX(e, x);
    y = this.processY(e, y);

    e.trigger(type, x, y, e);

    if (button) {
      e.trigger(type + ':' + button, x, y, event);
    }
  },

  bindEvents: function(canvas) {

    this.canvas = canvas;

    var e = this.event.bind(this),
      p = this.press.bind(this);

    re.listener('mousedown', p, canvas);
    re.listener('mouseup', p, canvas);
    re.listener('mousemove', e, canvas);
    re.listener('mouseover', e, canvas);
    re.listener('mouseout', e, canvas);
    re.listener('click', e, canvas);
    re.listener('dblclick', e, canvas);
    re.listener('contextmenu', e, canvas);
  },

  offX: 0,
  offY: 0

})
  .init(function(canvas) {
  this.entities = re.g('mouse').create();
  this.bindEvents(canvas);
});
/*
The pressed method is used to check if a key or keys are currently pressed.
This is most useful in mousemove, keydown or usually an update listener.

@usage
//move player
re.e('update image player.png')
.on('update', function(){
  
  if(re.pressed(['w', 'up'])){
    this.posY -= 10;
  }

});

//click based on key
re.e('mouse image button.png')
.on('click', function(){
  
  if(re.pressed('mouse:middle')){
    //do something..
  }

});

*/
re.pressed = function(key){
		
		var c = arguments;
		
		if(re.is(key, 'array')) c = key;
		
		for(var i=0, l = c.length; i<l; i++){
			if(re.pressed.d[c[i]]){
				return true;
			}
		}
		
		return false;
};
re.pressed.d = {};
/*
The PreventDefault method prevents defaults for input events.
*/
re.preventDefault = function(pres){
  if(re.is(pres, 'string')) pres = pres.split(' ');
  
  for(var i in pres){
    re.preventDefault.d[pres[i]] = 1;
  }
};
re.preventDefault.d = {};
/*
The touch component handles touch events and dispatches signals.
*/
/*re.c('touch')
.statics({
	
	touchEvent:function(e){
		
	},
	
	active:false,
	
	i:function(){
		if(!this.active){
			this.active = true;
			
			re.listener('touchstart', this.touchEvent, false);
			re.listener('touchmove', this.touchEvent, false);
			re.listener('touchend', this.touchEvent, false);
			
		}
	}
	
});*/
/*
The bisect component cuts an object into equal sections. It supplies helper functions 
for converting to a section and from a section. Useful for sprites and animation.

The bisect is the width of an area.
The size is the size of each equally divided block inside the width.
For a sprite the bisect would be the total width of the image
and the size would be the size of each frame.

The bisect transforms two numbers, x and y positons, into a single bi number.

This works by increasing the bi value once the x position is past the width.
Note: width is called the bisect and the bi is the transformed x,y positions.



*/
re.c('bisect')
.statics({
	
	toX:function(bi, width, size){
		
		return this.toTileX(bi, width, size) * size;
	},
	
	toY:function(bi, width, sizeX, sizeY){
		
		return this.toTileY(bi, width, sizeX) * sizeY;
	},
	
	toTileX:function(bi, width, sizeX){
		
		return bi % (width / sizeX) | 0;
	},
	
	toTileY:function(bi, width, sizeX){
		return (bi * sizeX) / (width - 0.1) | 0;
	},
	
  /*
  Accepts Tile positions not normal X,Y
  */
	tileToBi:function(xt, yt, w, s){
		
		return (xt + (yt * (w / s)));
	}
	
})
.defines({

	
	biToX:function(bi){
		
		return re.bisect.toX(bi, this.bisect, this.sizeX);
	},
	
	biToY:function(bi){
		
		return re.bisect.toY(bi, this.bisect, this.sizeX, this.sizeY);
	},
	
	biToTileX:function(bi){
		
		return re.bisect.toTileX(bi, this.bisect, this.sizeX);
	},
	
	biToTileY:function(bi){
    //sizeY doesn't matter when dealing with bisects
		return re.bisect.toTileY(bi, this.bisect, this.sizeX);
	},
	
	tileToBi:function(xt, yt){
		return re.bisect.tileToBi(xt, yt, this.bisect, this.sizeX);
	}
	
})
.defaults({
	
	//full width
	bisect:1,
	
	sizeX:1,
	sizeY:1
	
});
/*
The body component replaces the hittest component for
a more precise hit test.

It also removes the usage of sizeX and sizeX for collision
boundaries.

@usage

re.e('body player.png')
.set({
bodyX:40,
bodyY:40,
padX:2 //pushes the body in 2 pixels on both right and left
})
.touches(0, 0, 40, 40) //touches random thing?
.touchesBody(0, 0, 40, 40, 2, 2) //touches another body?

*/
re.c('body')
.defines({
	
	hit:function(x, y, w, h, rx, ry){
    if(re.is(x,'object')){
      y = x.posY || x.y;
      w = x.sizeX || x.w;
      h = x.sizeY || x.h;
      rx = x.regX || 0;
      ry = x.regY || 0;
      x = x.posX || x.x;
    }
    
    rx = rx || 0;
    ry = ry || 0;
    
    var regX = this.regX ||0;
    var regY = this.regY ||0;
    
		return !
		(
		x - rx > this.posX + this.bodyX - this.padX - regX  ||
		x + w -rx < this.posX + this.padX - regX ||
		y -ry > this.posY + this.bodyY - this.padY - regY ||
		y + h - ry < this.posY + this.padY - regY
		);
	},
	
	hitBody:function(x, y, bx, by, px, py, rx, ry){
    if(re.is(x,'object')){
      y = x.posY || x.y;
      bx = x.bodyX;
      by = x.bodyY;
      px = x.padX;
      py = x.padY;
      rx = x.regX || 0;
      ry = x.regY || 0;
      x = x.posX || x.x;
    }
    
    rx = rx || 0;
    ry = ry || 0;
    
    var regX = this.regX ||0;
    var regY = this.regY ||0;
    
    
		return !
		(
		x + px - rx> this.posX + this.bodyX + this.padX -regX ||
		x + bx - px -rx < this.posX + this.padX -regX ||
		y + py -ry > this.posY + this.bodyY - this.padY - regY ||
		y + by - py -ry < this.posY + this.padY - regY
		);
	}
	
	
})
.defaults({
	
  posX:0,
  posY:0,
  
	padX:0,
	padY:0,
	
	bodyX:1,
	bodyY:1
	
});
/*
The clamp component constraints a value inside a range.

This can be useful for maps, characters, enemies, boxes etc..

re.e('clamp bitmap char.png')
.clamp('posX', 0, 10) //clamps to 0-10
.clamp('health', 0) //minimum 0

//maybe in the future..
//.clamp('name', 'ben', 'roger', 'bob') //clamps name to one of these
//.clamp('name', ['yep', 'beb'])
//.clamp('type, [0, 10, 13])
*/

re.c('clamp')
.method(function(value, h, l){
    
    if(value < h){
        return h;
    } else if(l != null && value > l){
        return l;
    }

    return value;
})
.defines('clamp',
function(value){
    //replae with real value
    var arg = Array.prototype.slice.apply(arguments);
    arg[0] = this.get(value);
    this.set(value, re.clamp.apply(re, arg));
    
    return this;
});
re.distance = function(x1, y1, x2, y2) {  
  var kx, ky;
  kx = x2 - x1;
  ky = y2 - y1;
  
  return Math.sqrt(kx*kx + ky*ky);
};
/*
The drag component adds functions to move points
in relation to its starting postion.
*/
re.c('drag')
.defaults({
	posX:0,
	posY:0,
	
	dragX:0,
	dragY:0,
	
	dragging:false
})
.defines({
	
	dragStart:function(x, y){
		if(!this.dragging){
			this.dragging = true;
			this.dragX = x;
			this.dragY = y;
      this.trigger('drag:start');
		}
    return this;
	},
	
	dragFinish:function(){
		this.dragging = false;
    return this.trigger('drag:finish');
	},
	
	dragUpdate:function(x, y){
		if(this.dragging){
			this.posX += x - this.dragX;
			this.posY += y - this.dragY;
			
			this.dragX = x;
			this.dragY = y;
      
      this.trigger('drag:update');
		}
    return this;
	}
	
});
/*
The Force component adds velocity, acceleration and other physical properties to an entity.

This does not implement collision detection! This allows an entity to move fluidly
through 2d, with gravity, and friction.

You can add hit collision check by defining a hitmap. Like so:

var mountainHits = re.e('hitmap');

re.e('force')
.set(hitmap:mountainHits);

//or define a hitmap for all physics objects
re.hitmap = re.e('hitmap');

var e = re.e('force');

e.hitmap == re.hitmap //true

Warning - this component is not delta time safe. It assumes a fixed timestep.
*/
re.c('force')
.requires('update')
.statics({
    graX:0,
    graY:0
})
.defaults({
    
    posX:0,
    posY:0,
    
    velX:0,
    velY:0,
    
    friX:0.4,
    friY:0.4,
    
    accX:0,
    accY:0,
    
    resX:0.4,
    resY:0.4,
    
    mass:1
    
})
.namespaces({
    
    update:function(){
        
        this.velX = this.force(this.velX, this.accX, this.friX, this.graX, this.mass);
        this.velY = this.force(this.velY, this.accY, this.friY, this.graY, this.mass);
        
        //check collisions and get result
        if(this.hitmap){
            
            this.aftermath(this.hitmap.checkHit(this));
            
        } else {
            
            this.aftermath(this.posX + this.velX, this.posY + this.velY);
        }
        
    }
    
})
.defines({
    
    aftermath:function(posx, posy, hitx, hity, tarx, tary){
        
        if(re.is(posx, 'object')){
            hitx = posx.hitX;
            hity = posx.hitY;
            
            tarx = posx.tarX;
            tary = posx.tarY;
            
            posy = posx.posY;
            posx = posx.posX;
        }
        
        this.posX = posx;
        this.posY = posy;
        
        if(hitx){
          this.velX = this.forceRes(this.velX, this.resX);
        }
        
        if(hity){
          this.velY = this.forceRes(this.velY, this.resY);
        }
        
        return this.trigger('aftermath', hitx, hity, tarx, tary);
    },
    
    forceRes:function(vel, res){
        return vel * -res;
    },
    
    forceGra:function(gra, mas){
        return gra * mas;
    },
    
    forceVel:function(vel, acc, fri){
        return (vel + acc) * fri;
        
    },
    
    force:function(vel, acc, fri, gra, mas){
        
        var v = this.forceVel(vel, acc, fri) + this.forceGra(gra, mas);
        
        if(Math.abs(v) < 0.01){
            v = 0;
        }
        
        return v;
    },
    
    isIdle:function(offset){
      offset = offset || 0;
        return Math.abs(this.velY + this.velX + this.accX + this.accY) <= offset;
    }
    
})
.init(function(){
    
    //setup defaults
    this.def({
      hitmap:re.hitmap,
      graX:re.force.graX,
      graY:re.force.graY
    });
    
    this.on('update', this.force_update);
})
.dispose(function(){
    
    this.off('update', this.force_update);
    
});
re.c('hit')
.defaults({
	
	posX:0,
	posY:0,
	
	sizeX:1,
	sizeY:1,
	
	/*
	checks if the two targets intersect with each other.
	
	k.hit(x, y, width, height);
	k.hit(entity);
  
	*/
	hit:function(x, y, w, h, rx, ry){
    if(re.is(x, 'object')){
      y = x.posY || x.y;
      w = x.sizeX || x.w;
      h = x.sizeY || x.h;
      rx = x.regX || 0;
			ry = x.regY || 0;
      x = x.posX || x.x;
    }

    rx = rx || 0;
    ry = ry || 0;
    var regX = this.regX || 0;
    var regY = this.regY || 0;

		return !
		(
		x - rx > this.posX + this.sizeX - regX ||
		x + w - rx < this.posX - regX ||
		y -ry > this.posY + this.sizeY - regY ||
		y + h - ry < this.posY - regY
		);
	}
	
});
/*

The hitmap component is used for collision detection in a tile-based game.
This can be sent to a physics entity and it will recieve checks if it hits
a tile.

Creating this bind system will allow other developers to easily implement
their own hit collision system.
*/
re.c('hitmap')
.requires('automap')
.defines({

    hitValue:1,
    
    checkAxisX:function(value, x, y, vx, vy){
        
        return value == this.hitValue;
        
    },
    
    checkAxisY:function(value, x, y, vx, vy){
        return value == this.hitValue;
    },
    
    checkHit:function(posX, posY, velX, velY, bodX, bodY, padX, padY){
        if(re.is(posX,'object')){
            velX = posX.velX;
            velY = posX.velY;
            
            bodX = posX.bodyX || posX.sizeX;
            bodY = posX.bodyY || posX.sizeY;
            
            padX = posX.padX || 0;
            padY = posX.padY || 0;
            
            posY = posX.posY;
            posX = posX.posX;
        }
        
        /*
        Can also include tarX, tarY.
        They contain the target positions of the hit.
        Useful information to calculate which axis was hit
        */
        var res = {
            posX:posX,
            posY:posY
        };
        
        var step = (Math.max(Math.abs(velX), Math.abs(velY)) / ((re.tile.sizeX + re.tile.sizeY) * 0.5) + 0.5) | 0;
        
        if(step > 1) {
            var sx = velX / step;
            var sy = velY / step;
            
            for(var i=0; i<step && (sx || sy); i++) {
                
                this.hitmap_step(res, posX, posY, sx, sy, bodX, bodY, padY, padY);
                
                if(res.hitX) {
                    sx = 0;
                }
                
                if(res.hitY) {
                    sy = 0;
                }
            }
            
        } else {
            
            this.hitmap_step(res, posX, posY, velX, velY, bodX, bodY, padX, padY);
            
        }
        
        return res;
    }
    
})
.namespaces({
    
    /*
    TODO:
    refactor
    possibly utilize entity methods for more robust calculations.
    */
    step:function(res, x, y, vx, vy, width, height, padx, pady){
    
        res.posX += vx;
        res.posY += vy;
        
        var t, ty, tx;
        
        if(vx) {
            
            t = re.tile.sizeX;
            
            var offsetx = (vx > 0 ? width - padx : padx);
            
            var firsty = Math.floor((y + pady)/ t);
            var lasty = Math.ceil((y + height - pady) / t);
            
            tx = Math.floor((x + vx + offsetx) / t);
            
            var offx = (vx < 0 ? t : 0);
            //is inside
            if(tx >= 0 && tx < this.lenX && lasty >= 0 && firsty < this.lenY) {
                
                for(ty = firsty; ty<lasty; ty++){
                    
                    if(this._automap[ty]){
                        
                        this.trigger('hit', this._automap[ty][tx], tx, ty);
                        
                        if(this.checkAxisX(this._automap[ty][tx], x, y, vx, vy)) {
                            res.hitX = true;
                            res.posX = tx * t + offx  - offsetx;
                            res.tarX = tx * t;
                            res.tarY = ty * t;
                            break;
                        }
                    }
                    
                }
                
            }
            
        }
        
        if(vy) {
            t = re.tile.sizeY;
            
            var offsety = (vy > 0 ? height -pady : pady);
            
            var firstx = Math.floor((res.posX + padx) / t);
            var lastx = Math.ceil((res.posX + width - padx) / t);
            ty = Math.floor((y + vy + offsety) / t);
            
            var offy = (vy < 0 ? t : 0);
            // Still inside this collision map?
            if(ty >= 0 && ty < this.lenY && lastx >= 0 && firstx< this.lenX) {
                    
                for(tx = firstx; tx<lastx; tx++) {
                    
                    if(this._automap[ty]){
                        
                        this.trigger('hit', this._automap[ty][tx], tx, ty);
                        
                        if(this.checkAxisY(this._automap[ty][tx], x, y, vx, vy)) {
                            res.hitY = true;
                            res.posY = ty * t + offy - offsety;
                            res.tarX = tx * t;
                            res.tarY = ty * t;
                            break;
                        }
                    }
                    
                }
            }
            
            
            
        }
        
    }
    
});
re.hitmap = null; //remove default hitmap so force defaults to none
re.c('iso')
.statics({
  sizeX:30,
  sizeY:30,
  sizeZ:30,
  
  /*
  Converts an x position into the closest iso x position.
  */
  toPosX:function(x, y){
    var isox = this.toIsoX(x, y);
    var isoy = this.toIsoY(x, y);
    
    return (isox - isoy) * this.sizeX;
  },
  
  toPosY:function(x, y){
    var isox = this.toIsoX(x, y);
    var isoy = this.toIsoY(x, y);
    
    return (isox + isoy) * this.sizeY * 0.5;
  },
  
  toPos:function(x, y){
    if(re.is(x,'object')){
      y = x.posY || x.y;
      x = x.posX || x.x;
    }
    
    return {posX:this.toPosX(x, y), posY:this.toPosY(x, y)};
  },
  
  /*
  Converts a position into the closest iso tile
  */
  toIsoX:function(x, y){
    var ym = (2*y - x) * 0.5;
    var xm = x + ym;
    
    return Math.round(xm / this.sizeX)-1;
  },
  
  toIsoY:function(x, y){
    var ym = (2*y - x) * 0.5;
    
    return Math.round(ym / this.sizeY);
  },
  
  toIso:function(x, y){
    if(re.is(x, 'object')){
      y = x.posY || x.y;
      x = x.posX || x.x;
    }
    return {isoX:this.toIsoX(x,y), isoY:this.toIsoY(x, y)};
  }
  
})
.defaults({
  posX:0,
  posY:0,
  posZ:0
})
.defines({
  
  /*
    Moves the iso entity to the given isometric position.
    
    examples:
    
    e.iso(1, 0, 0);
    
    e.iso(otherIso);
    
    e.iso({x:1, y:1, z:2});
  */
  iso:function(x, y, z){
    if(re.is(x,'object')){
      z = x.z
      if(re.is(x.posZ)){
        z = x.posZ / re.iso.sizeZ;
      }
      y = x.y;
      
      //copy attributes
      if(re.is(x.posX) && re.is(x.posY)){
        this.posX = x.posX;
        this.posY = x.posY;
        if(x.posZ){
          this.posZ = x.posZ;
        }
        return this;
      }
      
      x = x.x;
      
    }
    
    //convert to screen space
    x = (re.is(x)) ? x : this.isoX();
    x *= re.iso.sizeX;
    
    //posY handles a lot of transformations, its safest to recalculate it
    y = (re.is(y)) ? y : this.isoY();
    y *= re.iso.sizeY;
    
    z = (re.is(z)) ? z : this.isoZ();
    z *= re.iso.sizeZ;
    
    //all values should be in screen space from here
    this.posX = x - y;
    this.posY = (x + y) * 0.5 - z;
    this.posZ = z;
    
    return this;
  },
  
  isoX:function(value){
    if(re.is(value)){
      
      return this.iso(value);
    }
    
    return (this.posX + (2*(this.posY+this.posZ) - this.posX) * 0.5) / re.iso.sizeX;
  },
  
  isoY:function(value){
    if(re.is(value)){
      
      return this.iso({y:value});
    }
    
    return ((2*(this.posY+this.posZ) - this.posX) * 0.5) / re.iso.sizeY;
  },
  
  isoZ:function(value){
    if(re.is(value)){
      
      return this.iso({z:value});
    }
    
    return this.posZ / re.iso.sizeZ;
  },
  
  //returns true if the current iso position is directly on top of a tile.
  onIso:function(){
    var total = this.isoX() + this.isoY() + this.isoZ();
    return (total|0) == total;
  }
  
});
/*
The point component definess an entity that has a 2d position in space.
This can be used for 2d calculations or most commonly 2d sprite positioning.

*/

re.c('point')
.defaults({
    
    posX:0,
    posY:0
    
})
.defines({
    
    pos:function(x, y){
        if(re.is(x,'object')){
            y = x.posY || x.y;
            x = x.posX || x.x;
        }
        
        this.posX = x;
        this.posY = y;
        
        return this;
    },
    
    distance:function(x, y){
        if(re.is(x,'object')){
            y = x.posY || x.y;
            x = x.posX || x.x;
        }
        return re.distance(this.posX, this.posY, x, y);
    }
    
});
/*
re.random() // 0 - 1 floats
re.random(10) // 0 - 9 integer
re.random(10, 30) // 10 - 30 integer
re.random([1, 10, 40]) // 1 or 10 or 40
re.random({ok:10, b:10, c:1}) //ok or b or c

*/
re.random = function(max, min){
  var r = Math.random();
  if(re.is(max, 'array')){
    return max[r * max.length | 0];
  } else if(re.is(max, 'object')){

		var result;
		for (var prop in max){
			if (Math.random() < 1/++r || !re.is(result)){
				result = prop;
			}
		}

    return result;
  }
		switch(arguments.length){
			case 0:
			return r;
			case 1:
			return r * max;
			case 2:
			return r * (max - min) + min;
  }
};

re.randomInt = function(){
	return re.random.apply(this, arguments)|0;
};
/*
Returns an array of integers within the given range.

re.range(0, 2); //[0, 1]
re.range(2, 10, 2); //[2, 4, 6, 8]

*/
re.range = function(start, finish, step){
  var a = [];
  for(var i=start||0; i<finish; i+=step||1){
    a.push(i);
  }
  return a;
};
/*
The tile component adds tile positioning functions and helper functions for tile based games.

@usage

//set tile size
re.tile.sizeX = 40;
re.tile.sizeY = 40;

//convert mouse coordinates to a tile position..
var mouse = {x:10, y:234};

re.tile.toX(mouse.x) // 0
re.tile.toY(mouse.y) 

//create tile
var tile = re.e('tile sprite tiles.png')
.tile(2, 4);

tile.posX // 2 * re.tile.sizeX == 80
tile.posY // 4 * re.tile.sizeY == 160

//create a bunch of tiles from a map

var map = 
[
[1,2,4,5,0,3,4,5,6,7],
[1,2,4,5,0,3,4,5,6,7],
[1,2,4,5,0,3,4,5,6,7],
[1,2,4,5,0,3,4,5,6,7]
];

re.e('tile sprite tiles.png', map.length * map[0].length)
.tilemap(map.length[0].length,function(x, y){
  this.tile(x, y);
  this.frame(map[y][x]);
});

@warning moving to negative tiles will cause rounding issues.
Its recommended you avoid negative tile values

TODO: remove size vars from entity. Use global size instead
*/
re.c('tile')
.statics({
    sizeX:40,
    sizeY:40,
    
    toPosX:function(x){
        return this.toTileX(x) * this.sizeX;
    },
    
    toPosY:function(y){
        return this.toTileY(y) * this.sizeY;
    },
    
    toPos:function(x, y){
      if(re.is(x,'object')){
        y = x.posY || x.y;
        x = x.posX || x.x;
      }
      
      return {posX:this.toPosX(x), posY:this.toPosY(y)};
    },
    
    //converts the given coordinate to a tile position
    toTileX:function(x){
        return (x - this.sizeX * 0.5) / this.sizeX + 0.5 | 0
    },
    
    toTileY:function(y){
        return (y - this.sizeY * 0.5) / this.sizeY + 0.5 | 0
    },
    
    toTile:function(x, y){
      if(re.is(x,'object')){
        y = x.posY || x.y;
        x = x.posX || x.x;
      }
      
      return {tileX:this.toTileX(x), tileY:this.toTileY(y)};
    }
    
})
.defaults({
    
    posX:0,
    posY:0,
    regX:0,
    regY:0
    
})
.defines({

    tile:function(x, y){
      if(re.is(x,'object')){
        //will mess up if regX is not top right corner
        y = x.y || re.tile.toTileY(x.posY);
        x = x.x || re.tile.toTileX(x.posX);
      }
      this.tileX(x);
      this.tileY(y);
      return this;
    },
    
    atTile:function(x, y){
      return this.tileX() == x && this.tileY() == y;
    },

    tileX:function(v){
      if(re.is(v)){
        this.posX = v * this.sizeX + 0.5 | 0;
        return this;
      }
      
      return this.posX / this.sizeX + 0.5 | 0;
    },
    
    tileY:function(v){
      if(re.is(v)){
        this.posY = v* this.sizeY + 0.5 | 0;
        return this;
      }
      
      return this.posY / this.sizeY + 0.5 | 0;
    }
    
})
.init(function(){
  this.sizeX = re.tile.sizeX;
  this.sizeY = re.tile.sizeY;
});
/*
The channel component allows you to play a sound component more than
once at the sametime. This is useful for shooting or fast games.

//create a new channel
re.e('channel attack.sfx')
.play()
.play()
.play();

//extension sfx is created for every 
//sound loaded regards of type

//TODO

//add more channels

        //cloning glitch fix
        document.body.appendChild(s);
        
        s.addEventListener('canplaythrough', function(e){
            
            //multiple channels will allow the sound to be played more at the sametime.
            //this will load the sound multiple times sadly FIX
            for(var i=0; i<re.load.maxChannels-1; i++){
                channels.push(s.cloneNode(true));
            }
            
            if(that._p){
                that._p.call(that, that.current, that.total, a);
            }
            
            if(that.current >= that.total){
                
                if(that._s){
                    that._s.call(that, that.assets);
                }
                
            }
            
        }, false);
*//*
re.channel = re.c('channel')
.requires('sound')
.defaults({
    volume:1,
    max:3
})
.defines({

    play:function(loop){
        if(!this.channels || !re.sound.enabled) return this;
        
        var c;
        for(var i=0; i<this.channels.length; i++){
            
            c = this.channels[i];
            if(c.ended || !c.currentTime){
                //play new channel
                c.play();
                break;
            } else if(i == this.channels[i].length-1){
                c.currentTime = 0;
                c.play();
            }
            
        }
        
        if(loop){
            
            var l = 0;
            
            c.addEventListener('ended', function(){
                
                if(loop == -1 || l >= loop){
                    this.currentTime = 0;
                    l++;
                }
                
            }, false);
            
        }
        
        return this;
    },
    
    stop:function(){
        
        //stop all channels
        
    }
    
});*/
/*
The playlist component allows you to play background music during a game.
It has methods for adding tracks and playing through them.
*/
re.c('playlist');
/*
The sound component utilizes the new HTML5 to play sound effects in the web browser.
It is reccommended to load two sound codecs OGG and AAC because not every browser supports
all sound codecs at this time.

//load a sound
re.load('run.ogg run.aac');
//BAD this will load both sounds. Even if the browser doesn't support one

//GOOD. load just one codec of the sound
var codec;
if(re.support('ogg')){
    codec = 'ogg';
} else if(re.support('aac')){
    codec = 'aac';
}

re.load('run.'+codec');

//create sound
re.e('sound run.'+codec);

//that is a pain, so a helper method has been created
re('sound run.'+re.support('ogg', 'aac'));

Its recomended to save the supported codec somewhere
//like so...
re.codec = re.support('ogg', 'aac');

re.load('run.'+re.codec);

re.e('run.'+re.codec);

WARNING: Because the sound component has generic
method names stop, play, watchout for overwrites.

Sound Tip
//find all sounds in game and play them!
re('sound').method('play');

*note: A sound only only has one channel and cannot be played multiple times at once.
This will be fixed with the channel component.

*/
re.c('sound')
.statics({
    
    enabled:true,
    volume:1
    
})
.defaults({
  playing:false
})
.namespaces({
  e:0,
  
  ended:function(){
    this.playing = 0;
    this.trigger('sound:finish');
    
  }
  
})
.defines({

    /*
    Plays the sound from the beginning.

    onFinish is called when the sound has finished playing through all loops.
    */
    play:function(loops, volume, onFinish){
        if(!this._sound || !re.sound.enabled) return this;
        if(this.playing) this.stop();
        
        var c = this._sound;
        var that = this;
        volume = volume || re.sound.volume;
        
        if(window.soundManager){
          //play sound with soundManager
          c.play({
            onfinish:function(){
              that.sound_ended();
              if(onFinish) onFinish(that);
            },
            position:0,
            volume:volume,
            loops:loops||1
          });
          
        } else {
          //play with browser
          c.currentTime = 0;
          c.volume = volume;
          loops = loops||1;
          
          var f = function(){
            if(--loops>0){
              c.play();
            } else {
              c.removeEventListener('ended', f);
              that.sound_ended();
              if(onFinish) onFinish(that);
            }
          };

          c.addEventListener('ended', f);

          c.play();
        }
        this.playing = 1;
      
        return this;
    },
    
    //stops playing the sound
    stop:function(){
        this._sound.pause();
        this.playing = 0;
        
        return this;
    }
    
});
/*
The automap component creates an auto expandable two-dimensional array.

@usage

var map = re.e('automap');

//set
//x = 0, y = 10, value = 10
map.automap(0, 10, 10)

//get
map.automap(0, 10) // 10

var level = 
[
[0,1,2,3,5,5],
[2,3,4,5,6,4]
]

//reference copy
map.automap(level)

map.automap(0, 1) // 1

//value copy
map.automap(level, true)

map.map == level //true

//length
map.lenX
map.lenY

*/
re.c('automap')
.defaults({
	lenX:0,
	lenY:0,
	automapDefault:0
})
.defines({
	
	automap:function(x, y, value){
    if(re.is(x, 'array')){
      
      if(y){
        
        //deep copy
        for(var y=0; y<x.length; y++){
			   for(var k=0; k<x[0].length; k++){
				   this.automap(k, y, x[y][k]);
			    }
		    }
        
      } else {
    		
        //non-deep copy
		  
		    this._automap = x;
		
    		if(x.length > 0){
    			this.lenX = x[0].length;
    		} else {
    			this.lenX = 0;
    		}
    		
    		this.lenY = x.length;
      }
      
      return this;  
    }
    
    if(!re.is(value)){
        if(this.within(x,y)){
            return this._automap[y][x];
        }
        return null;
    }
    
			//increate y length
			while(y >= this._automap.length){
				var m = new Array(this._automap[0]);
				
				for(var l in m){
					m[l] = this.automapDefault;
				}
				
				this._automap.push(m);
				
			}
			
			//increase x length
			while(x >= this._automap[this._automap.length-1].length){
				
				for(var k=0; k<this._automap.length; k++){
          if(this._automap[k].length <= x){
  					this._automap[k].push(this.automapDefault);
          }
				}
				
			}
			
			this.lenX = this._automap[y].length;
			this.lenY = this._automap.length;
			
			this._automap[y][x] = value;
			
			return this;
	},
	
	within:function(x, y){
		return y >= 0 && y < this.lenY && x >= 0 && x < this.lenX;
	}
	
})
.init(function(){
	this._automap = [];
});
/*
The flicker component calls the implemented flick method with the given array data over a period of time.

This is most popular for sprite animation.

It can also be used for graduatly writing text or flashing a drawing object.

re.c('health')
.requires('flicker')
.defines({
  
  health:100,
  flick:function(health){
    this.health += health;
    if(this.health >= 100){
      //stops flicker
      return false;
    }
  },
  
  regen:function(){
    //adds health over a duration of 30 seconds
    this.flicker(30, [5, 5, 5, 5, 5, 5]);
  }

});

var e = re.e('health').set('health', 40);

//low on health, regenerate
e.regen();

*/
re.c('flicker')
.requires('update timestep')
.namespaces({
	flickering:'',
  
	stop:function(){
		var o = this.flicker_id;
		this.flicker_id = '';
			
		this.stepProgress = 0;
			
		this.off('update', this.flicker_update);
    
		return this.trigger('flicker:finish', o);
	},
	
  change:function(){
    
		//check if over
		if(this.flicker_frame == this.flicker_frames.length){
			
			if(this.flicker_loops == -1 || --this.flicker_loops >= 1){
				//loop again
				
				this.flicker_frame = 0;
				
			} else {
				//done flickering
				
				this.flicker_stop();
	  			return;
			}
		}
			
     this.flicker_run();
  },
  
  run:function(){
    
    var f = this.flicker_frame, //frame number
    fs = this.flicker_frames, //array of frames
    l = this.flicker_loops, //loops left
    val = fs[f]; //flick value
    
    var quit = this.flick(val, f, fs, l);
    
    this.trigger('flicker:update', val, f, fs, l);
    
	//flick
	if(quit === false){
    	//stop
    	this.flicker();
     }
      
	this.flicker_frame++;
  },
  
	update:function(t){
		this.timestep(t, this.flicker_change);
	},
	
})
.defines({
  
	/*
  
  loops defaults to 1
  id default to true
  
	FUTURE: 
	-allow backward animations
	-allow entry of an array of frames. So each counter will go to the next frame in the array
	*/
	flicker:function(duration, frames, loops, id){
		
	    //stop
		if(!re.is(duration) && this.flickering()){
			//stop flickering
			return this.flicker_stop();
		}
		
	    //convert to seconds
	    if(duration >= 100){
	    	duration /= 1000;
	    }
	    
		this.flicker_duration = duration || 1;
    
	    frames = (re.is(frames,'array')) ? frames : [frames];
    
		//setup counter for loops
		this.flicker_loops = loops || 1;
		
		this.stepProgress = 0;
		this.stepSize = (duration / frames.length) / re.loop().second;
    
	    this.flicker_frames = frames;
		this.flicker_frame = 0;
		
		if(!this.flickering()){
			this.on('update', this.flicker_update);
		}
		
	    //sets flicker status
		this.flicker_id = id || true;
    
		this.trigger('flicker:start');
    	
		//update frame then run
		//this.flicker_run();
		
		return this;
	},
	
	/*
	Check if flicker is running / compare current.
	
	this.flickering(); // returns current flicker name
	this.flickering('idle'); // false
	*/
	flickering:function(id){
		if(id){
			return this.flicker_id == id;	
		}
		
		return this.flicker_id;
	}
	
});
/*
The pathfind comp finds a path towards a target position. The .search() method will return
an int array describing the movements to the target position.

searchNodes() and checkNode() can be overwritten.

//example

//1 is unwalkable
var map = 
[
[0,0,0,1],
[0,1,0,0]
]

//automap is helpful for two-dim arrays
var level = re.e('automap').automap(map);

var path = re.e('pathfind')
.set({
  //this is checked for every tile. Returning false will skip it, making the tile unwalkable.
  checkNode:function(x, y, parentX, parentY){
    return level.within(x, y) && level.automap(x, y) == 0;
  }
});

//search
var start = {x:0, y:0};
var end = {x:2, y:1};

//also called on every tile exactly like checkNode.
//this can be used for custom spcific pathfinds
var onCheck = function(x, y, parentX, parentY){
  return true;
}

//called when a tile is accepted into path
var onTile = function(x, y, parentX, parentY, cost){
  
}

var ints = path.pathfind(start.x, start.y, end.x, end.y, onCheck, onTile);

//will return a path of ints like so..
// [x3, y3, x2, y2, x1, y1]

while(ints.length){
  var y = ints.pop();
  var x = ints.pop();
  
  //move unit to x,y, etc..
  
}

*/
re.c('pathfind')
.method(function(){
    var p = re.e('pathfind');
    var path = p.pathfind.apply(p, arguments);
    p.dispose();
    return path;
})
.defines({
  
  pathfind_max:50,
  
  pathfind:function(x, y, targetX, targetY, onCheck, onTile){
    this.targetX = targetX;
    this.targetY = targetY;
    
    this.onCheck = onCheck;
    this.onTile = onTile;
    
    this.visit = {};
    this.nodes = [];
    
    this.addNode(x, y, -1, -1);
    
    var n, count = 0;
    
    while(this.nodes.length){
      n = this.nodes.shift();
      
      if(n.x == this.targetX && n.y == this.targetY){
        return this.makePath(n);
      } else {
        
        this.searchNodes(n.x, n.y, n.px, n.py);
        
        if(++count >= this.pathfind_max){
          //limit reached
          return null;
        }
        
      }
      
    }
    
    return null;
  },
  
  searchNodes:function(x, y){
    this.addNode(x+1, y, x, y);
    this.addNode(x-1, y, x, y);
    this.addNode(x, y+1, x, y);
    this.addNode(x, y-1, x, y);
  },
  
  checkNode:function(){
    return true;
  },
  
  makePath:function(node){
    var path = [], num=0;
    
    do{
      //starts at target and moves backwards to initial position
      
      path[num++] = node.x;
      path[num++] = node.y;
      
      node = this.nodes[node.px+'_'+node.py];
      
    } while(node && node.px != -1);
    
    return path;
  },
  
  addNode:function(x, y, px, py){
    
    if(!this.checkNode(x, y, px, py) || (this.onCheck && !this.onCheck(x, y, px, py))){
      return false;
    }
      
    var name = x+'_'+y;
    
    var cost = re.distance(x, y, this.targetX, this.targetY);
    
    if(!this.nodes[name] || this.nodes[name].cost > cost){
      
      var n = this.nodes[name] = {x:x, y:y, cost:cost, px:px, py:py};
      
      var placed = false;
      //enter in better cost nodes
      for(var i=0, l = this.nodes.length; i<l; i++){
        if(cost < this.nodes[i].cost){
          this.nodes.splice(i, 0, n);
          placed = true;
          break;
        }
      }
      
      //just push it
      if(!placed){
        this.nodes.push(n);
      }
      
      //hook in methods
      if(this.onTile) this.onTile(x, y, px, py, cost);
      
      return true;
    }
        
  }
  
});
/*
The timestep component gathers steps over time and once the maximum steps
are achieved it will dispatch the callback method. This method is also delta time
safe, so you don't need to worry about alternate values over time.

  
*/

re.c('timestep')
.defaults({
    
    stepProgress:0,
    stepSize:100
    
})
.defines({
    
    timestep:function(progress, callback, context){
        
        this.stepProgress += progress;
        
        while(this.stepProgress >= this.stepSize){
            
            callback.call(context || this);
            
            this.stepProgress -= this.stepSize;
            
            //break if stepSize is zero
            if(!this.stepSize) break;
        }
        
    }
    
})
re.s('render')
.defines({

	process:function(e){
		if(e.visible && !e.visible()) return;

		if(e.draw){
            this.begin(e, this.context);
    			e.draw(this.context);
            this.end(e, this.context);
		}
	},

	begin:function(e, c){

        c.save();

        if(e.alpha-1)
            c.globalAlpha = e.alpha;

        if(e.screenable)
            c.translate(e.screenX(), e.screenY());
        else
            c.translate(e.posX, e.posY);

        if(e.rotation)
            c.rotate(e.rotation * Math.PI / 180);


        if(e.scaleX != 1 || e.scaleY != 1)
            c.scale(e.scaleX, e.scaleY);

	},

	end:function(e, c){
        c.restore();
	}

})
.init(function(context, entities){
	this.context = context;
	this.entities = entities || re.g('render').create();
});
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
/*
Clones the given object. This returns a shallow copy.
*/
re.clone = function(b){
	if(!re.is('object')) return b;
	if(re.is(b,'array')) return b.slice();
	var o = {};
	for(var i in b){
		o[i] = b[i];
	}
	return o;
};
/*
Returns first value that is not null or undefined.

re.defaults(null, 0, 100); //0

*/
re.defaults = function(){
	for(var i in arguments){
		var k = arguments[i];
		if(k!=null){
			return k;
		}
	}
};
/*
The polyfill component polyfills unsupported HTML5 functions when possible.
*/
re.c('polyfill')
.defines({
	
	requestAnimationFrame:function(callback, canvas){
		return requestAnimFrame(callback, canvas);
	}
	
})
.run(function(){
	
	//setup requestanimationframe on support
	requestAnimFrame = 
	window.requestAnimationFrame ||
	window.webkitRequestAnimationFrame ||
	window.mozRequestAnimationFrame ||
	window.oRequestAnimationFrame ||
	window.msRequestAnimationFrame ||
	function(callback){
		window.setTimeout(callback, 1000 / 60);
	};
	
});

/*
Goes to an other scene in the game. This calls the scene method with a possible object argument.

Scenes are a helpful way to organize stages of a game.

//create scene
re.scene('game')
.enter(function(data){
	
	//remove all 2d elements
	re('2d').dispose();
	
	loadLevel(data.level);
	
});

//go to scene
re.scene('game').enter({tiles:[]} );

*warning- bad idea passing in functions as the first argument

//create manually
re.e('scene:game')
.enter(function(){
  
})

*/

re.c('scene')
.statics({
	
	_scenes:{}
	
})
.method(function(title){
	var d = re.scene;
	
  if(!re.is(title)){
    return d._scenes[re.scene.current];
  }
  
	if(!d._scenes[title]){
		//add scene
		d._scenes[title] = re.e('scene')
        .attr('sceneName', title);
	}
	
	return d._scenes[title];
})
.defines({

	enter:function(title){
    if(!re.is(title, 'function')){
      
      //enter scene

      if(re.scene.current)
          re.scene().exit();
      
      //set current scene
  		re.scene.current = this.sceneName
  		
      if(this.scene_enter)
    		this.scene_enter.apply(this, arguments);
        
    } else {
      //set new enter method
  		this.scene_enter = title;
    }
		
		return this;
	},
	
	exit:function(m){
        if(!re.is(m, 'function')){
          //exit scene
          re.scene.current = '';
          
          if(this.scene_exit)
              this.scene_exit.apply(this, arguments);
        } else {
            //set new exit method
      		this.scene_exit = m;
        }
		
		return this;
	}
  
});
/*
The sheet component converts a each frame of a sprite sheet into their own components.
*/
re.sheet = function(map, components, sizeX, sizeY){
        
    var frameWidth = sizeX || re.tile.sizeX;
    var frameHeight = sizeY || re.tile.sizeY;
    
    if(re.is(components,'array')){
      components = components.join(' ');
    }
        
    //create new sprites for sheet
        
    //save frame positions from map
    var x;
    var y;
    var b = [];
    for(var p in map){
        x = map[p][0] || 0;
        y = map[p][1] || 0;
        b.push(p);
        re.c(p)
        .requires('sprite '+components)
        .defines({
      frameX:x,
      frameY:y,
      sizeX:frameWidth,
      sizeY:frameHeight
        });
            
    }
  
    return b;
};
/*
The support component contains information about supported
functionality of the browser.

//returns true if canvas AND text is supported
if(re.support('canvas text')){
	//supports
}

//checks all arguments and returns first thing thats supported
re.support('ogg', 'aac', 'mp3', 'wav');

//find first supported storage storage
re.support('database', 'localstorage');

this is helpful to find a supported codec or a storage component

or add to entity

re.e('support').support('canvas');

---- possible support checks
canvas
text
audio
ogg
mp3
wav
aac
localstorage
worker
webgl

*/
(function(){
re.support = function(s){
		if(arguments.length > 1){
			//find first supported arg and return

			var d;
			for(var i=0; i<arguments.length; i++){
				d = arguments[i];
				if(re.support(d)){
					return d;
				}
			}

			return false;
		}

		//find if supported
		var k = s.split(' ');

		var stat = true;

		//check multiple supports
		for(var j in k){
				stat = stat && !!re.support[k[j]];
		}

		return stat;
}

	//add supports to component
	var c = re.support;

	//check canvas support
	c.canvas = !!document.createElement('canvas').getContext;

	//check for text support
	c.text = !!(c.canvas && typeof document.createElement('canvas').getContext('2d').fillText == 'function');

	//check audio support
	var ele = document.createElement('audio');

	try {

		if(c.audio = !!ele.canPlayType){

			c.ogg  = ele.canPlayType('audio/ogg; codecs="vorbis"');
			c.wav  = ele.canPlayType('audio/wav; codecs="1"');
			c.webma = ele.canPlayType('audio/webm; codecs="vorbis"');
			c.mp3  = ele.canPlayType('audio/mpeg; codecs="mp3"');
			c.m4a = ele.canPlayType('audio/mp4; codecs=mp4a.40.2');

			//switch unsupported codecs to false
			for(var i in c){
				if(c[i] == 'no' || c[i] == ''){
					c[i] = false;
				}
			}

		}

	} catch(e){}

	//check local storage
	try {
		c.localstorage = !!localStorage.getItem;
	} catch(e){
		c.localstorage = false;
	}

	//check web worker
	c.worker = !!window.Worker;

	//check webgl
	c.webgl = !!window.WebGLRenderingContext;

	c.touch = 'ontouchstart' in window;
})();