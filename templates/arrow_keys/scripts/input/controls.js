/*
The controls component listens for keyevents and creates new arrows
based on keys pressed.
*/
re.c('controls')
.requires('keyboard')
.defines({
  
  addArrow:function(count){
    count = count || 1;
    //creates a new arrow
    re.e('arrow', count);
  },
  
  removeArrow:function(){
    //finds an entity with the arrow component and removes it.
    re('arrow').random().dispose();
  }
  
})
.init(function(){
  //called on instantiation
  
  //listen for key events
  //these come from the keyboard component
  this.on({
    'keydown:space': function(){
      this.addArrow();
    },
    'keyup:r': function(){
      this.removeArrow();
    }
  });
  
});