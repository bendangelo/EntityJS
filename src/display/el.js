/*
The element comp creates and displays DOM elements. This can be used to display buttons, 
images, icons etc. on top of the canvas element.

re.e('el:a').el //element refence

re.$ must be overwritten by JQuery or Zepto to properly work.

re.$ = $;

*/
re.c('el')
.requires('align')
.defines({

  posX:function(x){
    if(re.is(x)){
      return this.el.css('left', x);
    }

    return this.el.position().left;
  },
  
  posY:function(y){
    if(re.is(y)){
      return this.el.css('top', y);
    }
    return this.el.position().top;
  },
  
  sizeX:function(){
    return this.el.outerWidth();
  },

  sizeY:function(){
    return this.el.outerHeight();
  },
  
  click:function(f){
    var that = this;
    this.el.click(function(e){
      f.call(that,e);
      return false;
    });
    return this;
  },

  $:function(a,b){
    return this.el.find(a,b);
  },

  setEl:function(tag){
    this.remove();

    this.el = re.$(re.$new(el)).addClass('el');

    this.posX(0);
    this.posY(0);
    return this;
  },

  remove:function(){
    if(this.el){
    	this.el.remove();
    }
    return this;
  },

  hide:function(){
    this.el.hide();
    return this;
  },

  show:function(){
    this.el.show();
  }
  
})
.init(function(c, e){
  if(e) this.setEl(e);
})
.dispose(function(c){
  this.remove();
});