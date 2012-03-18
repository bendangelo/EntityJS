module('scenes/game');

test('exit cleanly', function(){
  
  re.scene('game').enter();
  
  //game finished
  re('counter')[0]
  .attr({
    maxCount:1
  })
  .up();
  
  ok(re('counter').length == 0)
  
});