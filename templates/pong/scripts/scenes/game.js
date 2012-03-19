re.scene('game')
.enter(function(twoPlayer){
  
  re.hitmap = re.e('hitmap');
  
  //setup counters
  
  //counter for player 1
  var p1 = re.e('counter')
  .alignHor(40)
  .on('max', function(){
    var message = 'You win!';
    if(twoPlayer) message = 'Player 1 wins!';
    
    re.scene('over').enter(message);
  });
  
  //counter for player 2
  var p2 = re.e('counter')
  .alignHor(-60)
  .on('max', function(){
    var message = 'You lose!';
    
    if(twoPlayer) message = 'Player 2 wins!';
    
    re.scene('over').enter(message);
  });
  
  //setup arena playing field
  var arena = re.e((twoPlayer)?'twoarena':'arena');
  
  //setup hitmap
  re.hitmap
  .on('score:left', function(){
    arena.restartRound();
    p1.up();
  })
  .on('score:right', function(){
    arena.restartRound();
    p2.up();
  });
  
  //exit game
  re.e('keyboard')
  .on('keyup:q', function(){
    re.scene('home').enter();
  });
  
  //start game
  arena.startRound();
  
})
.exit(function(){
  
  re('arena').dispose();
  re('counter').dispose();
  
  re.hitmap.dispose();
  delete re.hitmap;
  
});