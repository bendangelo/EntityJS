/*
The update component calls update signals to all listening entities.
*/
re.c('update')
.statics({
	l:[],
	update:function(t){
		var l = this.l;
		
		for(var k=l.length, b; k--;){
			b = l[k];
			b.updateable && b.trigger('update', t);
		}
		
	}
})
.defaults({
	updatable:true
})
.defines(function(){
	
	var l = re.c('update').l;
	
	return {
  
  update:function(method){
    return (re.is(method, 'function')) ? this.on('update', method) : this.updatable && this.trigger('update', method);
  },
    
	updateFirst:function(){
		
		l.splice(l.indexOf(this), 1);
		
		l.push(this);
		
		return this;
	},
	
	updateLast:function(){
		
		l.splice(l.indexOf(this), 1);
		
		l.unshift(this);
		
		return this;
	},
	
	updateAfter:function(e){
		
		var him = l.indexOf(e);
		var me = l.indexOf(this);
		
		if(him > me){
			//swap
			var t = l[him];
			l[him] = l[me];
			l[me] = t;
		}
		
		return this;
	},
	
	updateBefore:function(e){
		
		var him = l.indexOf(e);
		var me = l.indexOf(this);
		
		if(him < me){
			//swap	
			var t = l[him];
			l[him] = l[me];
			l[me] = t;
		}
		
		return this;
	}
	
	};
	
}())
.init(function(c){
	c.l.unshift(this);
})
.dispose(function(c){
	
	c.l.splice(c.listeners.indexOf(this), 1);
});