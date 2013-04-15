module('play');

test('enter play scene', function(){

  expectCall(re('level')[0], 'build');

  re.scene('play').enter(0);

  ok(re.screen().posX != 0);
  ok(re.screen().posY != 0);

  expect(re.scene('play').counter).to.exist;
  expect(re.scene('play').level).to.exist;

});