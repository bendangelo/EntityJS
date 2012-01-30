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
        for(var j = 0; j<temp.length; j++){
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
            bind:binds,
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
        var i = 0;
        
        if(typeof select == 'string'){
            
            if(select == '*'){
                
                this.concat(re._e.slice());
                
                return this;
            }
            
            //optimize search and cache
            var obj = q._toObj(select);
            
            var en;
            main : for(; i<re._e.length; i++){
                en = re._e[i];
                
                if(en.has(obj)){
                
                    this.push(en);
                }
                
            }
            
            
        } else if(re.is(select, 'function')){
            
            for(; i<re._e.length; i++){
                
                if(select.call(re._e[i], i, re._e.length)){
                    this.push(re._e[i]);
                }
                
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
    p.each = function(m){
        var l = this.length, i = -1, e;
        
        while(++i < l && (e = this[i]) && m.call(e, i, l) !== false);
        
        return this;
    }
    
    /*
    The map method allows multidimensional loops.
    
    //map through and increase y every 3 entities.
    
    re('draw').tileMap(3, function(x, y){
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
        
        for(var i =0, l = this.length; i<l; i++){
            
            if(method.call(this[i], x, y, i, l) == false) break;
            
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
    
    p.defines = function(){
      throw 'Deprecated use attr'
    }
    
    p.attr = function(obj, value){
        this.each(function(){
            this.attr(obj,value);
        });
        
        return this;
    }
    
    p.defaults = function(){
      throw 'Deprecated use defaults'
    }
    
    p.def = function(obj, value){
        this.each(function(){
            this.def(obj, value);
        });
        
        return this;
    }
    
    p.comp = function(c){
        
        this.each(function(ref){
            this.comp(c);
        });
        
        return this;
    }
    
    p.removeComp = function(c){
        this.each(function(ref){
          this.removeComp(c);
        });
    }
    
    p.bind = function(type, method){
        var p = arguments;
        
        this.each(function(ref){
            this.bind.apply(this, p);
        });
        
        return this;
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
        
    }).bind('spawn');
    
    */
    p.filter = function(method){
        
        var q = re();
        var that = this;
        
        this.each(function(i, l){
            
            if(method.call(this, i, l)){
                //add entity
                q.push(this);
            }
            
        });
        
        return q;
    }
    
    p.has = function(comp){
        
        for(var i=0; i<this.length; i++){
            if(!this[i].has(comp)){
                return false;
            }
        }
        
        return true;
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
        return this[index];
    }
    
    /*
    Put entity into query array.
    */
    p.put = function(entity){
        
        this.push(entity);
        
        return this;
    }
    
    re.query = q;
    
}(re));