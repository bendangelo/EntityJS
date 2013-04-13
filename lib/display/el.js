/*
The element comp creates and displays DOM elements. This can be used to display buttons, 
images, icons etc. on top of the canvas element.

re.e('el').$el //jquery element reference

Jquery must be available to work!

*/
re.c('el')
.requires('align')
.defines({

  posX:function(x){
    if(re.is(x)){
      this.$el.css('left', x);
      return this;
    }

    return this.$el.position().left;
  },
  
  posY:function(y){
    if(re.is(y)){
      this.$el.css('top', y);
      return this;
    }
    return this.$el.position().top;
  },
  
  sizeX:function(){
    return this.$el.outerWidth();
  },

  sizeY:function(){
    return this.$el.outerHeight();
  },
  
  click:function(f){
    var that = this;
    this.$el.click(function(e){
      f.call(that,e);
    });
    return this;
  },

  $:function(a,b){
    return this.$el.find(a,b);
  },

  setEl:function(el){
    this.removeEl();

    //create element if string
    if(re.is(el, 'string')){
      el = re.$new(el);
    }

    this.el = el;
    this.$el = $(el).addClass('el');

    this.posX(0);
    this.posY(0);
    return this;
  },

  text:function(t){
    if(re.is(t)){
      this.$el.text(t);
      return this;
    }
    return this.$el.text();
  },

  //places element to parent of canvas
  addEl:function(targ){
    targ = targ || $(re.loop().canvas).parent();

    targ.append(this.el);
    return this;
  },

  removeEl:function(){
    if(this.$el){
    	this.$el.remove();
    }
    return this;
  },

  hide:function(){
    this.$el.hide();
    return this;
  },

  show:function(){
    this.$el.show();
    return this;
  }
  
})
.init(function(){
  this.setEl('div');
})
.dispose(function(){
  this.removeEl();
});