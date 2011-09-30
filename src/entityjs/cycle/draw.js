re.c('draw')
.global({
	listeners:[],
	
	draw:function(s, c){
		var l = this.listeners;
		
		for(var k=0, le = l.length, b; k < le; ++k){
			b = l[k];
			
			if(b && b.sys == s && b.drawing){
				/*if(!b.canvasCache){
					b.draw_render(c);
				} else {
					b.signal('draw', c);
				}*/
				b.draw_render(c);
				
			}
		}
		
	}
	
})
.init(function(c){
	
	c.listeners.push(this);
	this.scale = {x:1, y:1};
	
	this.reg = {x:1, y:1};
	
	//set default screen
	this.screen = re.screen;
	
})
.dispose(function(c){
	
	c.listeners.splice(c.listeners.indexOf(this), 1);
	
})
.inherit({
	
	sys:re.sys,
	drawing:true,
	rotation:0,
	alpha:1
	
})
.inherit({
	
	cache:function(){
		if(!this.image) return this;
		
		this.clearCache();
		
		var c = re.$new('canvas');
		var s = Math.max(this.image.width, this.image.height);
		c.width = s;
		c.height = s;
		
		this.draw_render(c.getContext('2d'));
		
		this.canvasCache = c;
		
		return this;
	},
	
	clearCache:function(){
		this.canvasCache = null;
	},
	
	drawFirst:function(){
		var l = re.c('draw').listeners;
		
		l.splice(l.indexOf(this), 1);
		
		l.unshift(this);
		return this;
	},
	
	drawLast:function(){
		var l = re.c('draw').listeners;
		
		l.splice(l.indexOf(this), 1);
		
		l.push(this);
		return this;
	},
	
	drawAfter:function(en){
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
	
	drawBefore:function(en){
		
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
	},
	
	getScreenX:function(){
		var x = this.pos.x;
		if(this.screen) x -= this.screen.pos.x;
		return x;
	},
	
	getScreenY:function(){
		var y = this.pos.y;
		if(this.screen) y -= this.screen.pos.y;
		return y;
	}
	
})
.namespace({
	
	render:function(c){
		this.draw_before(c);
		this.signal('draw', c);
		this.draw_after(c);
	},
	
	before:function(c){
		
		c.save();
		
		if(this.alpha != 1)
			c.globalAlpha = this.alpha;
		
		
		c.translate(this.getScreenX(), this.getScreenY());
		
		if(this.rotation != 0)
			c.rotate(this.rotation * Math.PI / 180);
		
		
		if(this.scale.x != 1 || this.scale.y != 1)
			c.scale(this.scale.x, this.scale.y);
		
	},
	
	after:function(c){
		c.restore();
	}
	
});