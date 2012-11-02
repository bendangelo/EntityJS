re.scene('home')
.enter(function(){
  
  //default text color to white
  re.c('text')
  .defines('textColor', '#fff')
  .requires('align');
  
  //prevent default for all keys used in game
  re.preventDefault('left right up down');
  
  re.e('text')
  .set({
    font:'30px sans-serif',
    text:'Pong',
    alignHor:0,
    alignVer:-100
  });
  
  re.e('text keyboard')
  .set({
    text:'Press z to start!',
    alignHor:0,
    alignVer:0
  })
  .on('keyup:z', function(){
    
    re.scene('game').enter(false);
  })
  .on('keyup:x', function(){
    re.scene('game').enter(true);
  });
  
  re.e('text')
  .set({
    text:'Press x for two player',
    alignHor:0,
    alignVer:25
  });
  
  //credits
  re.e('text')
  .set({
    text:'http://www.entityjs.com',
    alignBottom:-5,
    alignLeft:5
  });
  
})
.exit(function(){
  
  //remove all draw objects
  re('draw').dispose();

});