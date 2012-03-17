module('displays/ball', lazy('ball'));

test('reset ball', function(){
  
  ball.reset();
  
  ok(ball.velX != 0)
  ok(ball.velY != 0)
  
});