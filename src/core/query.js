(function(re){
    
    /*
    Searches through all entities using the selector conditions
    
    //identifiers
    * identifies all
    ^ identifies a bind
    # identifies an id
    ! identifies not
    
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
    
    //find all bitmap entities with update bind.
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
        var binds = [];
        var minus = [];
        var id = '';
        
        //split string
        var fl;
        var val;
        for(var j = temp.length; j--;){
            fl = temp[j].charAt(0);
            val = temp[j].substr(1);
            
            if(fl == '^'){
                binds.push(val);
            } else if(fl == '!'){
                minus.push(val);
            } else if(fl == '#'){
                id = val;
            } else {
                comps.push(temp[j]);
            }
        }
        
        var comp = {
            comp:comps,
            on:binds,
            not:minus,
            id:id
        };    
        
        q.c[query] = comp;
        
        return comp;
    }
    
    q.c = {};
    
    var p = q.prototype = new Array;
    
    p.query = function(select){
        select = select || '';
        var l = re._e.length, i = -1, e;
        
        if(re.is(select, 'string')){
            
            if(select == '*'){
                
                this.push.apply(this, re._e.slice());
                
                return this;
            }
            
            //optimize search and cache
            var obj = q._toObj(select);
            
            while(++i < l && (e = re._e[i])){
                if(e.has(obj)) this.push(e);
            }
            
        } else if(re.is(select, 'function')){
            
            while(++i < l && (e = re._e[i])){
               if(select.call(e, i, l)) this.push(e);
            }
            
        }
        
        return this;
    }
    
    /*
    Calls the given method name on all entities.
    
    re('enemies').method('rest');
    */
    p.method = function(m){
        var b = Array.prototype.slice.call(arguments, 1);
        return this.each(function(){
        
            this[m].apply(this, b);
        });
        
    }
    
    /*
    example
    re('draw').each(function(index, length){
        
    });
    
    returning false will break the loop
    */
    p.each = function(m){
        var l = this.length, i = -1, e;
        
        while(++i < l && (e = this[i]) && m.call(e, i, l) !== false);
        
      return this;
    }
    
    /*
    The map method allows multidimensional loops.
    
    //map through and increase y every 3 entities.
    
    re('draw').tilemap(3, function(x, y){
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
    p.tilemap = function(w, method){
        var x = 0;
        var y = 0;
        
        return this.each(function(i, l){
            
            if(method.call(this[i], x, y, i, l) == false) return false;
            
            x++;
            
            if(x == w){
                x = 0;
                y++;    
            }
        });
    }
    
    /*
    Returns an array of all components in the query.
    */
    p.comps = function(){
        var l = [];
        
        this.each(function(){
          var k = this.comps();
          for(var i=0; i<k.length; i++){
            if(l.indexOf(k[i]) == -1){
              l.push(k[i])
            }
          }
        });
        
        return l;
    }
    
    /*
    Returns a random entity.
    */
    p.random = function(){
        return this[~~(Math.random()*this.length)];
    }
    
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
    
    p.defines = function(){
      throw 'Deprecated use attr'
    }
    
    p.attr = function(obj, value){
        return this.each(function(){
            this.attr(obj,value);
        });
        
    }
    
    p.defaults = function(){
      throw 'Deprecated use def'
    }
    
    p.def = function(obj, value){
        return this.each(function(){
            this.def(obj, value);
        });
        
    }
    
    p.comp = function(c){
        
        return this.each(function(ref){
            this.comp(c);
        });
        
    }
    
    p.removeComp = function(c){
        return this.each(function(ref){
          this.removeComp(c);
        });
    }
    
    p.on = function(type, method){
        
        return this.each(function(){
            this.on(type,method);
        });
        
    }
    
    p.off = function(type, method){
        return this.each(function(){
            this.off(type, method);
        });
    }
    
        p.trigger = function(){
            var p = arguments;
            return this.each(function(){
                this.trigger.apply(this, p);
            });
        }
    
    p.has = function(comp){
        
        for(var i=0; i<this.length; i++){
            if(!this[i].has(comp)){
                return false;
            }
        }
        
        return this.length != 0;
    }
    
    p.dispose = function(){
        
        return this.each(function(){
            
            this.dispose();
            
        });
        
    }
    
    p.last = function(){
      return this[this.length-1];
    }
    
    re.query = q;
    
}(re));