module('home');

test('move from to play', function(){
  
  expectCall(re.scene('play'), 'enter');
  
  re.scene('home').enter();
  
});