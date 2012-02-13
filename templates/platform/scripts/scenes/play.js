re.scene('play')
.enter(function(level){
  
  //display coin text
  this.counter = re.e('counter');
  
  //find level
  this.level = re(level+'.tmx')[0];
  
  //load it
  this.level.build();
  
})
.exit(function(){
  
  this.counter.dispose();
  
  //teardown level
  this.level.teardown();
  
});