module('scenes/game');

test('exit cleanly', function(){
  
  re.scene('game').enter();
  
  //game finished
  re('counter')[0]
  .set({
    maxCount:1
  })
  .up();
  
  ok(re('counter').length == 0)
  
});