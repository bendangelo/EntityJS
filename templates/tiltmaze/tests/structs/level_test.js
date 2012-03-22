module('structs/level', lazy('level box'));

test('defines ball', function(){
  
  ball = level.ball;
  
  is(ball);
  
  eq(ball.level, level);
  
});

test('defines targets', function(){
  
  //lazy smoke test
  ok(re('target').length != 0);
  
});

test('collects targets advances to next level', function(){
  
  //two targets are in the level
  //collecting them should advance to the next one
  
  expectCall(re.scene('game'), 'advance');
  
  var ball = level.ball;
  
  var first = re('target')[0];
  
  //move to target
  ball.tile(first);
  
  ball.trigger('move:update');
  
  eq(re('target').length, 1);
  
  var last = re('target')[0];
  
  ball.tile(last);
  
  ball.trigger('move:update');
  
});