re.scene('home')
.enter(function(){
  
  re.e('sprite flicker hero.png align keyboard')
  .attr({
    
    //sets frame size
    sizeX:25,
    sizeY:25,
    
    animate:function(){
      //first arg is time in milliseconds, array contains the frame numbers to flick through.
      //time per frame = time / frames.length
      this.flicker(300, [0, 1, 2, 3, 4, 0]);
    },
    
    //centers image on screen
    alignHor:0,
    alignVer:0
    
  })
  //listens for keyup event
  .on('keyup:enter', function(){
    this.animate();
  });
  
  //add help text
  re.e('text align')
  .text('Press enter to animate')
  .alignTop(5)
  .alignLeft(5);
  
});