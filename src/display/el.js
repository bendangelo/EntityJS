/*
The element comp creates and displays DOM elements. This can be used to display buttons, 
images, icons etc. on top of the canvas element.

NOTE: re.$ must be overwritten with Jquery or the like for proper use.

re.$ = $;

re.e('el:a').el //element refence

*/
re.c('el')
.defines({
  
  offX:0,
  offY:0,

  posX:function(x){
    if(re.is(x)){
      return this.el.style.left =  x + this.offX;
    }
    return this.el.style.left - this.offX;
  },
  
  posY:function(y){
    if(re.is(y)){
      return this.el.style.top =  y + this.offY;
    }
    return this.el.style.top - this.offY;
  },
  
  sizeX:function(){
    return this.el.offsetWidth;
  },

  sizeY:function(){
    return this.el.offsetHeight;
  },

  setEl:function(el){
    this.remove();

    this.el = document.createElement('<'+el+'>');
    this.el.style.position = 'absolute';
    this.el.style.zIndex = 100;
  },

  remove:function(){
    if(this.el){
      var p = this.el.parentNode;
      if(p) p.removeChild(this.el);
    }
  }
  
})
.init(function(c, e){
  if(e) this.setEl(e);
})
.dispose(function(){
  this.remove();
});