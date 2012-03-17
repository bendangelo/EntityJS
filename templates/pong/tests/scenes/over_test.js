module('scenes/over');

test('enter over scene', function(){
  
  var message = 'You lost!';
  
  re.scene('over').enter(message);
  
  eq(re('text')[0].text(), message);
  
  expectCall(re.scene('home'), 'enter');
  
  //back to home
  keyup('z');
  
});