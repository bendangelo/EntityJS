module('scenes/home', lazyScene('home'));

test('entities should exist', function(){
  
  var home = re.scene('home'),
  circle = home.circle,
  text = home.text;
  
  is(circle);
  
  //has update listener
  expectEvent(circle, 'update');
  expectValueDown(circle, 'posX');

  //moves upon keypress
  keypress('a', function(){
    //key is currently down, so call update method
    circle.trigger('update');
  });
  
  //text exists
  is(text);
});
