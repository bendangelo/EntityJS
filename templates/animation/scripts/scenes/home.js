re.scene('home')
.enter(function(){
  
  re.e('sprite flicker hero.png align')
  .attr({
    
    sizeX:25,
    sizeY:25,
    
    animate:function(){
      this.flicker(300, [0, 1, 2, 3, 4]);
    },
    
    alignHor:0,
    alignVer:0,
    
  })
  
  //add help text
  re.e('text align')
  .text('Press enter to animate')
  .alignTop(5)
  .alignLeft(5);
  
});