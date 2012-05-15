/*
The element comp creates and displays DOM elements. This can be used to display buttons, 
images, icons etc. on top of the canvas element.

NOTE: re.$ must be overwritten with Jquery or the like for proper use.

re.$ = $;

//all newly created elements will be appended inside
re.element.parent = re.$('.game-box');

re.e('element:a').el //element refence

*/
re.c('element')
.defines({
  
  posX:function(x){
    if(re.is(x)){
      this.el
    }
    return this.el.top;
  },
  
  posY:function(y){
    if(re.is(y)){
      this.el = 
    }
    return this.el.left;
  },
  
  setEl:function(el){
    if(re.is(el, 'string')){
      el = $(el);
    }
    this.$el = el;
    this.el = el;
  }
  
})
.init(function(c, e){
  this.setEl(e);
});