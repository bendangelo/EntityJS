re.scene('load')
.enter(function(){
  
  re.load(re.assets)
  .complete(function(){
    
    //move to home
    re.scene('home').enter();
  })
  .error(function(e){
    
  })
  .progress(function(i){
    
  });
  
})
.exit(function(){
  //exit load scene
})