re.scene('home')
.enter(function(){
  
  //stop the browser from moving around
  re.preventDefault('left right up down');
  
  var radius = 10;
  var color = '#FF0000';

  //create new circle on canvas
  this.circle = re.circle(radius, color)
  //from align component
  .alignHor()
  .alignVer()
  .set('speed', 15)
  .tag('circle');
  
  //add help text
  this.text = re.e('text align render')
  .text('Use WASD or arrow keys to move the circle')
  .alignTop(5)
  .alignLeft(5);
  
});