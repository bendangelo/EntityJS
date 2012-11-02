re.c('arena')
.defines({
  
  startRound:function(){
    this.ball = re.e('ball');
    this.ball.reset();
  },
  
  stopRound:function(){
    //reset players
    if(this.ball) this.ball.dispose();
    return this;
  },
  
  restartRound:function(){
    this.stopRound();
    this.startRound();
  }
  
})
.init(function(){
  
  //player
  re.e('player').alignRight(-10);
  
  //ai or player 2
  this.paddle2 = re.e('paddle ai');
  
})
.dispose(function(){
  re('paddle').dispose();
  this.stopRound();
});