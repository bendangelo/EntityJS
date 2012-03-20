re.scene('home')
.enter(function(){
  
  //add help text
  re.e('text align')
  .attr({
    font:'bold 30px Verdina',
    text:'Tilemaze'
  })
  .alignHor()
  .alignVer(-60);
  
  re.e('text align')
  .text('Press any key to begin\nQ - Quit\nR - Restart')
  
})
.exit(function(){
  
  re('text').dispose();
  
});