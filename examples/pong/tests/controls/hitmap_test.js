/*
The hitmap controls the balls boundaires, so i'll write some extra tests to make sure it works.
*/
module('controls/hitmap', {
  setup:function(){
    hitmap = f('hitmap');
    ball = f('ball');
  },
  teardown:function(){
    hitmap.dispose();
    ball.dispose();
  }
});

test('ball hitting the left side should trigger event', function(){
  
  ball.posX = -1 + ball.hsizeX;
  
  expectTrigger(hitmap, 'score:left');
  
  hitmap.checkHit(ball);
  
});

test('ball hitting the right side should trigger event', function(){
  
  ball.posX = re.loop().sizeX - ball.hsizeX + 1;
  
  expectTrigger(hitmap, 'score:right');
  
  hitmap.checkHit(ball);
  
});

test('ball should hit top', function(){
  
  ball.posY = -1 + ball.hsizeY;
  
  var res = hitmap.checkHit(ball);
  
  eq(res.hitY, 1);
  eq(res.posY, ball.hsizeY);
  
});

test('ball should hit bottom', function(){
  
  ball.posY = re.loop().sizeY - ball.hsizeY + 1;
  
  var res = hitmap.checkHit(ball);
  
  eq(res.hitY, 1);
  eq(res.posY, re.loop().sizeY - ball.hsizeY);
  
});

test('ball should hit right of paddle', function(){
  
  var paddle = re.e('paddle')
  .set({
    posX:100,
    posY:100
  });
  
  ball.posX = paddle.posX + paddle.hsizeX + ball.hsizeX;
  
  var res = hitmap.checkHit(ball);
  
  ok(res.hitX);
  eq(res.posX, ball.posX+1);
  
})

test('ball should hit left of paddle', function(){
  
  var paddle = re.e('paddle')
  .set({
    posX:100,
    posY:100
  });
  
  ball.posX = paddle.posX - ball.hsizeX - paddle.hsizeX;
  
  var res = hitmap.checkHit(ball);
  
  ok(res.hitX);
  eq(res.posX, ball.posX-1);
  
});