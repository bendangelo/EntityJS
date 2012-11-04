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
    var q = function(c, count, alone){
        if(!count){
            var r = new re.entity.init(c);
            
            if(!alone){
                re._e.push(r);
            }
          return r;
        }
        
        //optimize for multiple calls
        var q = re();
        
        //create entity by number of count
        for(var i=0; i<count; i++){
            q.push(re.e(c, 0, alone));
        }
        
        return q;
    };
    
    var e = function(c){
        
        this._re_comps = [];
        this._re_listens = {};
        
        this.comp(c);
    };
    
    var p = e.prototype = re.class.extend({});
    
    p.comp = function(com){
        
        this._re_comp(com);
        
        //check implement
        if(this._re_interfaces){
            
            for(var i in this._re_interfaces){
                if(!this.hasOwnProperty(this._re_interfaces[i])){
                    throw 'Interface: '+this._re_interfaces[i]+' missing';
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
        
        if(com && this.has(com)){
          
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
        
        //will be sent to init function
        var vals = com.split(':');
        
        com = vals[0];
        
        //remove comp string
        vals.shift();

        //add component
        c = re._c[com];

        //if already has component
        if(!this.has(com)){
        
        //add comp first thing, to avoid dupe requirement calls
        //and this lets the init remove the comp too.
        this._re_comps.push(com);
        
        //init component only if it exists
        if(c){
            this._re_comp(c._re_requires);
            
            //add interface of component
            if(c._re_interfaces){
                if(!this._re_interfaces){
                    this._re_interfaces = [];
                }
                this._re_interfaces = this._re_interfaces.concat(c._re_interfaces);
            }
            
            if(c._re_asserts){
                if(!this._re_asserts){
                    this._re_asserts = [];
                }
                this._re_asserts = this._re_asserts.concat(c._re_asserts);
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
    
    p.clone = function(count, a){
        return re.e(this._re_comps, count, a);
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
            if(!this._re_listens[s] || this._re_listens[s].length == 0){
                return false;
            }
        }
        
        if(comp.id && this.id != comp.id){
            return false;
        }
        
        
        return true;
    };
    
    
    p.dispose = function(){
      var dis = 'dispose';
        
        //trigger dispose on all components
        this.removeComp(this.comps());
        
        this.trigger(dis);
        
        //remove all events
        this.off();
        
        //delete from statics array
        var index = re._e.indexOf(this);
        if(index != -1)
            re._e.splice(index, 1);
        
        return this;
    }
    
    re.entity = re.e = q;
    re.entity.init = e;
    
}(re));