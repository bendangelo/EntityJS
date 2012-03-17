re.scene('game')
.enter(function(twoPlayer){
  
  //setup counters
  var p2 = re.e('counter')
  .alignHor(-60)
  .on('win', function(){
    re.scene('over').enter('You lost!');
  });
  
  var p1 = re.e('counter')
  .alignHor(40)
  .on('win', function(){
    re.scene('over').enter('You win!');
  });
  
  //setup hitmap
  re.hitmap = re.e('hitmap')
  .on('hit:left', function(){
    p2.up();
  })
  .on('hit:right', function(){
    p1.up();
  });
  
  this.arena = re.e('arena')
  .attr({
    twoPlayer:twoPlayer
  })
  .startRound();
  
})
.exit(function(){
  
  this.arena.dispose();
  re('counter').dispose();
  re.hitmap.dispose();
});