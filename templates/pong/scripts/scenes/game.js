re.scene('game')
.enter(function(twoPlayer){
  
  //setup counters
  var p2 = re.e('counter')
  .alignHor(-60);
  
  var p1 = re.e('counter')
  .alignHor(40);
  
  this.arena = re.e('arena')
  .attr({
    twoPlayer:twoPlayer
  })
  .on({
    oneScore:function(){
      p1.up();
    },
    twoScore:function(){
      p2.up();
    }
  })
  .startRound();
  
})
.exit(function(){
  
  this.arena.dispose();
  re('counter').dispose();
  
});