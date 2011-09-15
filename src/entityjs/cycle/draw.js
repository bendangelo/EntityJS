re.c('draw')
.static({
	listeners:[],
	
	draw:function(context){
		var that = re.c('draw');
		
		for(var k in that.listeners){
			if(that.listeners[k].visible){
				that.listeners[k].signal('draw', context);
			}
		}
	}
})
.init(function(c){
	c.listeners.push(this);
	
})
.dispose(function(c){
	
	c.listeners.splice(c.listeners.indexOf(this), 1);
})
.define({
	visible:true,
	
	infront:function(en){
		var l = re.c('draw').listeners;
		var him = l.indexOf(en);
		var me = l.indexOf(this);
		
		if(him > me){
			//swap
			var t = l[him];
			l[him] = l[me];
			l[me] = t;
		}
		
		return this;
	},
	
	inback:function(en){
		
		var l = re.c('draw').listeners;
		var him = l.indexOf(en);
		var me = l.indexOf(this);
		
		if(him < me){
			//swap	
			var t = l[him];
			l[him] = l[me];
			l[me] = t;
		}
		
		return this;
	}
	
});