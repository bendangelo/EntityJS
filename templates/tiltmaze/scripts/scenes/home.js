re.scene('home')
.enter(function(){
  
  //add help text
  re.e('text align')
  .set({
    font:'bold 30px Verdina',
    text:'Tiltmaze'
  })
  .align(0, -60);
  
  re.e('text align keyboard')
  .text('Press any key to begin\nQ - Quit\nR - Restart')
  .align()
  .on('keyup', function(){
    re.scene('game').enter(1);
  });
  
})
.exit(function(){
  
  re('text').dispose();
  
});