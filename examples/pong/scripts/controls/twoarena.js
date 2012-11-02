re.c('twoarena')
.requires('arena')
.init(function(){
  
  //remove ai and add player controls
  this.paddle2
  .removeComp('ai')
  .comp('player')
  .set({
    upKey:'up',
    downKey:'down'
  });
  
});