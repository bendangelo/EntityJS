re.scene('over')
.enter(function(message){
  
  re.e('text align')
  .attr({
    font:'30px sans-serif',
    text:message,
    alignVer:-60,
    alignHor:-20
  })
  
  re.e('text align keyboard')
  .attr({
    text:'Press Z to continue',
    alignVer:-20,
    alignHor:0
  })
  .on('keyup:z', function(){
    
    re.scene('home').enter();
    
  });
  
})
.exit(function(){
  
  re('text').dispose();
  
});