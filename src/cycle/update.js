/*
The update component calls update signals to all listening entities.
*/
re.c('update')
.statics({
	l:[],
	update:function(t){
		var l = this.l;
		
		for(var k=0, b; k<l.length; k++){
			b = l[k];
      
			if(b && b.updatable){
        b.trigger('update', t);
      }
      
		}
		
	}
})
.defaults({
	updatable:true
})
.defines(function(){
	
	var l = re.c('update').l;
	
	return {
  
	updateFirst:function(){
		
		l.splice(l.indexOf(this), 1);
		
		l.unshift(this);
		
		return this;
	},
	
	updateLast:function(){
		
		l.splice(l.indexOf(this), 1);
		
		l.push(this);
		
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
	c.l.push(this);
})
.dispose(function(c){
	
	c.l.splice(c.l.indexOf(this), 1);
});