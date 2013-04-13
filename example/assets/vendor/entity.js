/* entity V0.5.0 */
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

		has:function(ref){
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
        // this.touchSys = re.s('touch').create();

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
EntityJS Javascript Game Engine
Copyright 2011, Ben D'Angelo 
http://entityjs.com

Licensed under MIT http://entityjs.com/license

*/
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

//automatically filled when compiled
re.version = "RE_VERSION";

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

};}(this));