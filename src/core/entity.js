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
            q._e.push(re.e(c));
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
    
    p.addComp = function(c){
      re.log('AddComp deprecated use comp')
      this.comp(c);
    };
    
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
    };
    
    p.removeComp = function(com){
        
        var pieces;
        
        //handle string or array?
        if(re.is(com,'object')){
            pieces = com;
            
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
        
        var c = re._c[com];
        
        if(!this.has(com)) return this;
        
        //remove from array
        this._re_comps.splice(this._re_comps.indexOf(com), 1);
        
        //only remove if it exists
        if(c){
            
            if(c._re_dispose){
                c._re_dispose.call(this, c);
            }
            
            c.bind('dispose', this);
            
        }
    };
    
    /*
    //add components
    this.comp('point text');
    
    //add health component with 100 health
    this.comp('health:100 physics');
    
    //remove components
    this.comp('-point');
    */
    /*p.comp = function(com){
        
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
    }*/
    
    p._re_comp = function(com){
        if(!com) return this;
        
        //split a multi word string into smaller one word function calls
        var pieces;
        
        //handle array or string?
        if(re.is(com, 'array')){
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
        
        var vals = com.split(':');
        
        com = vals[0];
        
        //add component
        c = re._c[com];
        
        //swap values
        vals[0] = c;
        
        //if already has component
        if(this.has(com)) return this;
        
        //add comp first thing, to avoid dupe requiresment calls
        //and this lets the init remove the comp too.
        this._re_comps.push(com);
        
        //init component only if it exists
        if(c){
            this._re_comp(c._re_requiress);
            
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
            
            if(c._re_definess){
                this.attr(c._re_definess);
            }
            
            if(c._re_init){
                c._re_init.apply(this, vals);
            }
            
            c.bind('init', this);
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
            //call entity parent methods
            re.e.init[method].apply(this, a);
        }
        
        var c = re._c[comp];
        
        if(c._re_definess[method]){
            return c._re_definess[method].apply(this, a);
        }
        
        if(c._re_inherits[method]){
            return c._re_inherits[method].apply(this, a);
        }
        
        return this;
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
        'bind':['draw'],
        'not':['update']
    });
    */
    p.has = function(comp){
        
        if(re.is(comp ,'string')){
            
            comp = re.query._toObj(comp);
        }
        
        comp.comp = comp.comp || [];
        comp.id = comp.id || '';
        comp.bind = comp.bind || [];
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
        for(p=0; p<comp.bind.length; p++){
            s = comp.bind[p];
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
    New way to add signals version 0.2.1.
    
    //single
    bind('draw', function(){});
    
    //multiple
    bind({
        
        draw:function(){},
        
        update:function(){}
        
    });
    */
    p.bind = function(type, method){
        
        if(re.is(type, 'object')){
            
            for(var k in type){
                this.bind(k, type[k]);
            }
            
        } else {
            
            if(!this._re_signals[type]){
                this._re_signals[type] = [];
            }
            
            this._re_signals[type].push(method);
            
        }
        
        return this;
    };
    
    /*
    Added in V0.2.1
    
    //remove single
    unbind('draw', this.draw);
    
    //remove multiple
    unbind({
        
        draw:this.draw,
        update:this.update
        
    });
    */
    p.unbind = function(type, method){
        
        if(re.is(type, 'object')){
            
            for(var k in type){
                this.unbind(k, type[k]);
            }
            
        } else {
            
            if(re.is(method, 'function')){
            
                for(var k in this._re_signals[type]){
                
                    if(this._re_signals[type][k] == method){
                        this._re_signals[type].splice(k, 1);
                    }
                    
                }
            } else {
                
                //no method was passed. Remove all signals
                this._re_signals[type] = [];
                
            }
        }
        
        return this;
    };
    
    /*
    Signal dispatches events to entities. 
    Modified V0.3
    
    
    -dispatch signals
    this.trigger('click');
    this.trigger('click draw');
    this.trigger('click', {data:0});
    
    */
    p.trigger = function(type){
        
        if(!this._re_signals[type])    return this;
        var b;
        
        for(var i=0, l = this._re_signals[type].length; i<l; i++){
            
            b = this._re_signals[type];
            
            if(!b[i]) continue;
            
            //return false remove?
            if(b[i].apply( (b[i].c)?b[i].c : this , Array.prototype.slice.call(arguments, 1)) === false){
                b.splice(i, 1);
            }
            
        }
        
        return this;
    };
    
    p.extend = function(){
        throw 'Deprecated use attr'
    };
    
    p.attr = function(obj, value){
        
        if(re.is(obj,  'object')){
            
            for(var key in obj){
                if(!obj.hasOwnProperty(key)) continue;
                
                this.attr(key, obj[key]);
            }
            
        }else {
            //defines property
            
            this[obj] = value;
        }
        
        return this;
    };
    
  p.inherit = function(){
    
    throw 'Deprecated use def'
  }
  
    p.defaults = function(){
       throw 'Deprecated use def'
    }
  
    p.def = function(obj, value){
        
        if(re.is(obj , 'object')){
        
            for(var key in obj){
                if(!obj.hasOwnProperty(key)) continue;
                
                this.def(key, obj[key]);
                
            }
            
        } else {
            //defines property
            
            if(!this.hasOwnProperty(obj) || !re.is(this[obj])){
                
                this[obj] = value;    
                
            }
        }
        
        return this;
    }
    
    p.dispose = function(){
        //delete from statics array
        re._e.splice(re._e.indexOf(this), 1);
        
        for(var i in this._re_comps){
            var k = re.c(this._re_comps[i]);
            if(k._re_dispose){
                k._re_dispose.call(this, k);
            }
            k.bind('dispose', this);
        }
        
        this.bind('dispose');
        
        return this;
    }
    
    re.entity = re.e = q;
    re.entity.init = e;
    
}(re));