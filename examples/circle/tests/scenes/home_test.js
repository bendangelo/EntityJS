module('scenes/home', lazyScene('home'));

test('entities should exist', function(){
  
  var home = re.scene('home'),
  circle = home.circle,
  text = home.text;
  
  is(circle);
  
  expectValueDown(circle, 'posX');

  //replace old method for this one test
  stub(re, 'press', function(v){
    return v == 'a';
  });

  //cal update method
  circle.trigger('update');
  
  //text exists
  is(text);
});
