module('controls/arena', lazy('arena'));

test('start round', function(){
  
  arena.startRound();
  
  is(arena.ball);
  
  ok(re('ball').length == 1);
  
  
});

test('stop round', function(){
  
  arena.stopRound();
  
  expect(0);
  
});