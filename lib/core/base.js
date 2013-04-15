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