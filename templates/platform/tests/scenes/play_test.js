module('play');

test('enter play scene', function(){
  
  expectCall(re('level1.tmx')[0], 'build');
  
  re.scene('play').enter('level1');
  
  ok(re.screen.posX != 0);
  ok(re.screen.posY != 0);
  
  is(re.scene('play').counter);
  is(re.scene('play').level);
  
});