module('controls/arena', lazy('arena'));

test('start round', function(){
  
  is(arena.ball);
  
  ok(re('ball').length == 1);
  
  arena.startRound();
  
});