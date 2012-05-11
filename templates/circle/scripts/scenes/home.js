re.scene('home')
.enter(function(){
  
  //stop the browser from moving around
  re.preventDefault('left right up down');
  
  //create new circle on canvas
  re.e('circle align update')
  .attr({
    radius:10,
    speed:15,
    color:'#ff0000'
  })
  //from align component
  .alignHor()
  .alignVer()
  .on('update', function(){
    
    //move on keypressed
    if(re.pressed('a', 'left')) this.posX -= this.speed;
    if(re.pressed('d', 'right')) this.posX += this.speed;
    
    if(re.pressed('w', 'up')) this.posY -= this.speed;
    if(re.pressed('s', 'down')) this.posY += this.speed;
    
  });
  
  //add help text
  re.e('text align')
  .text('Use WASD or arrow keys to move the circle')
  .alignTop(5)
  .alignLeft(5);
  
});