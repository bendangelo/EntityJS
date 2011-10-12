re.c('draw')
.global({
	listeners:[],
	
	draw:function(s){
		var l = this.listeners;
		
		for(var k=0, le = l.length, b; k < le; ++k){
			b = l[k];
			
			if(b && b.sys == s && b.drawing && b.isVisible()){
				/*if(!b.canvasCache){
					b.draw_render(c);
				} else {
					b.signal('draw', c);
				}*/
				b.draw_render(s.context);
				
			}
		}
		
	}
	
})
.implement('draw')
.init(function(c){
	
	c.listeners.push(this);
	
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
	alpha:1,
	
	scaleX:1,
	scaleY:1,
	
	posX:0,
	posY:0,
	
	sizeX:1,
	sizeY:1,
	
	regX:0,
	regY:0
	
})
.extend({
	
	cache:function(){
		if(!this.image) return this;
		
		this.clearCache();
		
		var c = re.$new('canvas');
		var s = Math.max(this.image.width, this.image.height);
		c.width = s;
		c.height = s;
		
		this.draw_render(c.getContext(re.sys.contextType));
		
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
		var x = this.posX;
		if(this.screen) x -= this.screen.posX;
		return x;
	},
	
	getScreenY:function(){
		var y = this.posY;
		if(this.screen) y -= this.screen.posY;
		return y;
	},
	
	/*
	Returns true or false wether the object is visible on screen.
	*/
	isVisible:function(){
		
		return (!this.screen || this.screen.touches(this.posX - this.regX, this.posY - this.regY, this.sizeX, this.sizeY));
		
	}
	
})
.namespace({
	
	render:function(c){
		if(!c) c = this.sys.context;
		
		this.draw_before(c);
			this.draw(c);
		this.draw_after(c);
	},
	
	before:function(c){
		
		c.save();
		
		if(this.alpha != 1)
			c.globalAlpha = this.alpha;
		
		c.translate(this.getScreenX(), this.getScreenY());
		
		if(this.rotation != 0)
			c.rotate(this.rotation * Math.PI / 180);
		
		
		if(this.scaleX != 1 || this.scaleY != 1)
			c.scale(this.scaleX, this.scaleY);
		
	},
	
	after:function(c){
		c.restore();
	}
	
});