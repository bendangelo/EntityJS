/*
The hitmap controls the balls boundaires, so i'll write some extra tests to make sure this works.
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
  
  ball.posX = -1 + ball.sizeX;
  
  expectTrigger(hitmap, 'hit:left');
  
  hitmap.checkHit(ball);
  
});

test('ball hitting the right side should trigger event', function(){
  
  ball.posX = re.sys.sizeX - ball.sizeX + 1;
  
  expectTrigger(hitmap, 'hit:right');
  
  hitmap.checkHit(ball);
  
});