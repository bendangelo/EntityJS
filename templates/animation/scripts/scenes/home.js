re.scene('home')
.enter(function(){
  
  re.e('sprite animate hero.png align keyboard')
  .attr({
    
    //sets frame size
    sizeX:25,
    sizeY:25,
    
    //animation object for animate comp
    anis:{
      //first arg is time in milliseconds, array contains the frame numbers to flick through.
      //time per frame = time / frames.length
      random:[300, [0,1,2,3,4,0]]
    },

    //centers image on screen
    alignHor:0,
    alignVer:0
    
  })
  //listens for keyup event
  .on('keyup:enter', function(){
    //play random animation
    this.animate('random');

    console.log('Currently animating:',this.flickering());
  })
  .on('keyup:q', function(){
    //ends animation
    this.animate();
  });
  
  //add help text
  re.e('text align')
  .text('Press enter to animate')
  .alignTop(5)
  .alignLeft(5);
  
});