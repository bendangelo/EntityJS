re.c('arena')
.defines({
  
  startRound:function(){
    this.ball.reset();
  },
  
  stopRound:function(){
    
  },
  
  restartRound:function(){
    this.stopRound();
    this.startRound();
  }
  
})
.init(function(){
  
  //player
  re.e('paddle player');
  
  //ai or player 2
  this.paddle2 = re.e('paddle');
  
  if(this.twoPlayer){
    this.paddle2.comp('player2');
  } else {
    this.paddle2.comp('ai');
  }
  
  //setup hitmap
  re.hitmap = re.e('hitmap');
  
  this.ball = re.e('ball');
  
});