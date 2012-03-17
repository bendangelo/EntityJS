re.c('arena')
.defines({
  
  startRound:function(){
    this.ball.reset();
  },
  
  stopRound:function(){
    //reset players
    re('paddle').alignVer();
  },
  
  restartRound:function(){
    this.stopRound();
    this.startRound();
  }
  
})
.init(function(){
  
  //player
  re.e('player');
  
  //ai or player 2
  this.paddle2 = re.e('paddle');
  
  if(this.twoPlayer){
    this.paddle2.comp('player2');
  } else {
    this.paddle2.comp('ai');
  }
  
  this.ball = re.e('ball');
  
})
.dispose(function(){
  re('paddle').dispose();
  this.ball.dispose();
});