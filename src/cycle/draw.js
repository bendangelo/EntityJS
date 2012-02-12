re.c('draw')
.statics({
    l:[],
    
    draw:function(c){
        var lis = this.l;
        
        for(var i=0, b; i<lis.length; i++){
          b = lis[i];
            b.drawable && b.visible() && b.draw_render(c);
        }
        
    }
    
})
.interfaces('draw')
.init(function(c){
    
    c.l.push(this);
    
})
.dispose(function(c){
    
    c.l.splice(c.l.indexOf(this), 1);
    
})
.defaults({
    
    drawable:true,
    rotation:0,
    alpha:1,
    
    scaleX:1,
    scaleY:1,
    
    posX:0,
    posY:0,
    
    sizeX:10,
    sizeY:10,
    
    regX:0,
    regY:0
    
})
.defines({
    
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
        var l = re.c('draw').l;
        
        l.splice(l.indexOf(this), 1);
        
        l.unshift(this);
        return this;
    },
    
    drawLast:function(){
        var l = re.c('draw').l;
        
        l.splice(l.indexOf(this), 1);
        
        l.push(this);
        return this;
    },
    
    drawAfter:function(en){
        var l = re.c('draw').l;
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
        
        var l = re.c('draw').l;
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
    
    screenX:function(x){
        if(x){
            this.posX = x + re.screen.posX;
            return this;
        }
        return this.posX - re.screen.posX;
    },
    
    screenY:function(y){
        if(y){
            this.posY = y + re.screen.posY;
            return this;
        }
        return this.posY - re.screen.posY;
    },
    
    /*
    Returns true or false wether the object is visible on screen.
    */
    visible:function(){
        
        return re.screen.hit(this.posX - this.regX, this.posY - this.regY, this.sizeX, this.sizeY);
        
    }
    
})
.namespaces({
    
    render:function(c){
        
        this.draw_before(c);
            this.draw(c);
        this.draw_after(c);
    },
    
    before:function(c){
        
        c.save();
        
        if(this.alpha != 1)
            c.staticsAlpha = this.alpha;
        
        c.translate(this.screenX(), this.screenY());
        
        if(this.rotation != 0)
            c.rotate(this.rotation * Math.PI / 180);
        
        
        if(this.scaleX != 1 || this.scaleY != 1)
            c.scale(this.scaleX, this.scaleY);
        
    },
    
    after:function(c){
        c.restore();
    }
    
});