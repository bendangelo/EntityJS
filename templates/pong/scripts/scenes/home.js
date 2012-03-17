re.scene('home')
.enter(function(){
  
  //default text color to white
  re.c('text').defines('textColor', '#fff');
  
  //prevent default for all keys used in game
  re.preventDefault('left right up down');
  
  re.e('text align')
  .attr({
    font:'30px sans-serif',
    text:'Pong',
    alignHor:-35,
    alignVer:-100
  });
  
  re.e('text align keyboard')
  .attr({
    text:'Press space to start!',
    alignHor:-20,
    alignVer:0
  })
  .on('keyup:z', function(){
    
    re.scene('game').enter(false);
  })
  .on('keyup:x', function(){
    re.scene('game').enter(true);
  });

})
.exit(function(){
  
  //remove all draw objects
  re('draw').dispose();

});