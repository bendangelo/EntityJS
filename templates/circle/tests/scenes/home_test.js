module('scenes/home', lazyScene('home'));

test('entities should exist', function(){
  
  var circle = re('circle')[0];
  
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
  is(re('text')[0]);
});
