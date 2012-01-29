re.scene('load')
.enter(function(){
  
  re.load(re.assets)
  .complete(function(){
    console.log('finished loading...')
    
    //move to home
    re.scene('home');
  })
  .error(function(e){
    console.log('Error loading asset: '+e);
  })
  .progress(function(i){
    console.log('Finished loading: '+i);
  });
  
})
.exit(function(){
  //exit load scene
})