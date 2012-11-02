module('scenes/game', lazyScene('game'));

test('load level', function(){
  
  is(game.currentLevel);
  
});

test('quit on keyup', function(){
  
  expectCall(game, 'quit');
  
  keyup('q');
  
})

test('restart on keyup', function(){
  
  expectCall(game, 'restart');
  
  keyup('r');
  
});

//uncomment the stop to test the level
test('test level1.json', function(){
  //stop();
  re.scene('game').enter(2);
  
  expect(0);
});

test('test level2.json', function(){
  //stop();
  re.scene('game').enter(2);
  
  expect(0);
});

test('test level3.json', function(){
  //stop();
  re.scene('game').enter(3);
  
  expect(0);
});

test('test level4.json', function(){
  //stop();
  re.scene('game').enter(4);
  
  expect(0);
});

test('test level5.json', function(){
  //stop();
  re.scene('game').enter(5);
  
  expect(0);
});