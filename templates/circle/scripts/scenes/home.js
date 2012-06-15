re.scene('home')
.enter(function(){
  
  //stop the browser from moving around
  re.preventDefault('left right up down');
  
  var radius = 10;
  var color = '#FF0000';

  //create new circle on canvas
  re.circle(radius, color)
  //from align component
  .alignHor()
  .alignVer();

  //find circle and change speed
  re('circle').first().attr('speed', 15);
  
  //add help text
  re.e('text align')
  .text('Use WASD or arrow keys to move the circle')
  .alignTop(5)
  .alignLeft(5);
  
});