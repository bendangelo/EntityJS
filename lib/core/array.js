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