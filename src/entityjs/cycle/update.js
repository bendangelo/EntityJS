/*
The update component calls update signals to all listening entities.
*/
re.c('update')
.global({
	listeners:[],
	
	update:function(s, tick, time){
		var l = this.listeners;
		
		for(var k=0, le = l.length, b; k < le; ++k){
			b = l[k];
			
			if(b && b.sys == s && b.updating){
				b.signal('update', tick, time);
			}
		}
		
	}
})
.inherit({
	updating:true,
	sys:re.sys
})
.inherit({
	
	updateFirst:function(){
		var l = re.c('update').listeners;
		
		l.splice(l.indexOf(this), 1);
		
		l.unshift(this);
		
		return this;
	},
	
	updateLast:function(){
		var l = re.c('update').listeners;
		
		l.splice(l.indexOf(this), 1);
		
		l.push(l);
		
		return this;
	},
	
	updateAfter:function(e){
		
		var l = re.c('update').listeners;
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
	
		var l = re.c('update').listeners;
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
	
})
.init(function(){
	re.c('update').listeners.push(this);
})
.dispose(function(){
	
	re.c('update').listeners.splice(re.c('update').listeners.indexOf(this), 1);
});