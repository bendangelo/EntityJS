re.scene('load')
.enter(function(){
  
  re.load(re.assets)
  .complete(function(){
    
    re.scene('home').enter();
    
  });
  
});