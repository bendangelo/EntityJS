/*
The update component calls update signals to all listening entities.
*/
re.c('update')
.global({
	listeners:[],
	update:function(s,t){
		var l = this.listeners;
		
		for(var k=0, le = l.length, b; k < le; ++k){
			b = l[k];
			
			if(b && b.sys == s && b.updating){
				b.bind('update', t, s.time);
			}
		}
		
	}
})
.defaults({
	updating:true,
	sys:re.sys
})
.extend(function(){
	
	var l = re.c('update').listeners;
	
	return {
	updateFirst:function(){
		
		l.splice(l.indexOf(this), 1);
		
		l.unshift(this);
		
		return this;
	},
	
	updateLast:function(){
		
		l.splice(l.indexOf(this), 1);
		
		l.push(l);
		
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
	c.listeners.push(this);
})
.dispose(function(c){
	
	c.listeners.splice(c.listeners.indexOf(this), 1);
});