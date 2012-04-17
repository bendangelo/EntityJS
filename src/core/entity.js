(function(re){
    
    /*
    Main function for re.e
    
    //create multiple entities
    re.e('spider', 10)
    //returns a query with all entities
    .each(function(index){
        this.posX = index * 10;
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
            q.push(re.e(c));
        }
        
        return q;
    };
    
    q.id = 0;
    
    var e = function(c){
        
        this._re_comps = [];
        this._re_signals = {};
        
        this.id = q.id+'';
        
        q.id++;
        
        re._e.push(this);
        
        this.comp(c);
    };
    
    var p = e.prototype;
    
    p.id = '';
    
    p.comp = function(com){
        
        this._re_comp(com);
        
        //check implement
        if(this._re_implements){
            
            for(var i in this._re_implements){
                if(!this.hasOwnProperty(this._re_implements[i])){
                    throw 'Interface: '+this._re_implements[i]+' missing';
                }
            }
            
        }
        
        //check asserts
        if(this._re_asserts){
          for(var t in this._re_asserts){
              if(this._re_comps.indexOf(this._re_asserts[t]) != -1){
                  throw 'Assert: '+this._re_asserts[t]+' is not allowed';
              }
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
        
        if(this.has(com)){
          
          var c = re._c[com];
          //only remove if it exists
          if(c){
              
              if(c._re_dispose){
                  c._re_dispose.call(this, c);
              }
              
              c.trigger('dispose', this);
              
          }
  
          //remove from array
          this._re_comps.splice(this._re_comps.indexOf(com), 1);
        }
        return this;
    };
    
    /*
    //add components
    this.comp('point text');
    
    //add health component with 100 health
    this.comp('health:100 physics');
    
    //remove components
    this.removeComp('point');
    */
    
    p._re_comp = function(com){
        if(!com) return this;
        
        //split a multi word string into smaller one word function calls
        var pieces;
        
        //handle array or string?
        if(re.is(com, 'array')){
            pieces = com;
        } else {
            pieces = com.split(' ');
        }
        
        if(pieces.length > 1){
          for(var i =0;i<pieces.length; i++){
                this._re_comp(pieces[i]);
            }
            return this;
        } else {
          com = pieces[0];
        }
        
        if(!com) return this;
        
        //component reference
        var c;
        
        var vals = com.split(':');
        
        com = vals[0];
        
        //add component
        c = re._c[com];
        
        //swap values
        vals[0] = c;
        
        //if already has component
        if(!this.has(com)){
        
        //add comp first thing, to avoid dupe requirement calls
        //and this lets the init remove the comp too.
        this._re_comps.push(com);
        
        //init component only if it exists
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
                this.def(c._re_inherits);
            }
            
            if(c._re_defines){
                this.attr(c._re_defines);
            }
            if(c._re_events){
              this.attr(c._re_events)
              .on(c._re_events);
            }
            
            if(c._re_init){
                c._re_init.apply(this, vals);
            }
            
            c.trigger('init', this);
        }
        
      }
        
    
        return this;
    }
    
    /*
    Returns component array
    */
    p.comps = function(){
        return this._re_comps.slice();
    }
    
    p.clone = function(count){
        return re.e(this._re_comps, count);
    }
    
    /*
    Calls methods of parent components.
    
    Use '' to call super of entity
    
    re.e('draw')
    .parent('draw', 'screenX')()
    
    */
    p.parent = function(comp, method){
        
        var a = Array.prototype.slice.call(arguments, 2);
        
        if(comp == ''){
            //call entity parent methods
            return re.e.init.prototype[method].apply(this, a);
        }
        
        var c = re._c[comp];
        
        if(c._re_defines[method]){
            return c._re_defines[method].apply(this, a);
        }
        
        return c._re_inherits[method].apply(this, a);
    }
    
    /*
    TODO defines has to multiple item query
    
    //returns true if both present
    this.has('draw update');
    
    //return true if bitmap not present but has update
    this.has('update -bitmap');
    
    //returns true if has asset id and update bind
    this.has('#asset ^update');
    
    //expanded
    this.has({
        'comp':['draw'],
        'id':'bob',
        'on':['draw'],
        'not':['update']
    });
    */
    p.has = function(comp){
        
        if(re.is(comp ,'string')){
            
            comp = re.query._toObj(comp);
        }
        
        comp.comp = comp.comp || [];
        comp.id = comp.id || '';
        comp.on = comp.on || [];
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
        for(p=0; p<comp.on.length; p++){
            s = comp.on[p];
            if(!this._re_signals[s] || this._re_signals[s].length == 0){
                return false;
            }
        }
        
        if(comp.id != '' && this.id != comp.id){
            return false;
        }
        
        
        return true;
    };
    
    /*
    
    //single
    bind('draw', function(){});
    
    //multiple
    bind({
        
        draw:function(){},
        
        update:function(){}
        
    });
    */
    p.on = function(type, method, context){
        
        if(re.is(type, 'object')){
            
          for(var k in type){
            this.on(k, type[k], method);
          }
            
        } else {
            
            if(!this._re_signals[type]){
                this._re_signals[type] = [];
            }
            if(!re.is(method)) throw 'Method is null'
            //save context
            this._re_signals[type].push({c:context || this, f:method});
            
        }
        
        return this;
    };
    
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
    p.off = function(type, method){
        
        if(re.is(type, 'object')){
            
            for(var k in type){
              if(type.hasOwnProperty(k))
                this.off(k, type[k]);
            }
            
        } else {
            
            if(method){
               var i = this._re_signals[type];
                for(var k in i){
                
                    if(i[k].f == method){
                        i.splice(k, 1);
                    }
                    
                }
            } else if(type){
                
                //no method was passed. Remove all signals
                this._re_signals[type] = [];
                
            } else {
                //remove all signals
                this._re_signals = {};
            }
        }
        
        return this;
    };
    
    /*
    Signal dispatches events to entities. 
    
    -dispatch signals
    this.trigger('click');
    this.trigger('click', 0);
    
    */
    p.trigger = function(type){
        
        if(!this._re_signals[type])    return this;
        var b;
        
        for(var i=0, l = this._re_signals[type].length; i<l; i++){
            
            b = this._re_signals[type];
            
            if(!b) break;
            if(!b[i]) continue;
            
            //return false remove
            if(b[i].f.apply(b[i].c, Array.prototype.slice.call(arguments, 1)) === false){
                b.splice(i, 1);
            }
            
        }
        
        return this;
    };
    
    p.attr = function(obj, value){
        
        if(re.is(obj,  'object')){
            
          for(var key in obj){
                this.attr(key, obj[key]);
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
    };
    
    p.def = function(obj, value){
        
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
    
    p.dispose = function(){
      var dis = 'dispose';
        
        //trigger dispose on all components
        this.removeComp(this.comps());
        
        this.trigger(dis);
        
        //remove all events
        this.off();
        
        //delete from statics array
        re._e.splice(re._e.indexOf(this), 1);
        
        return this;
    }
    
    re.entity = re.e = q;
    re.entity.init = e;
    
}(re));