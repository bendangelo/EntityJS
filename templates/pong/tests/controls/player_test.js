module('controls/player', lazy('player'));

test('paddle moves down on w press', function(){
  
  player.posY = 30;
  
  stub(player, 'checkBounds');
  
  expectValueDown(player, 'posY');
  
  keypress('w', function(){
    player.update();
  });
  
});

test('paddle moves up on s press', function(){
  
  player.posY = 10;
  console.log(player.posY)
  expectValueUp(player, 'posY');
  
  //remove this
  stub(player, 'checkBounds');
  
  keypress('s', function(){
    player.update();
  });
  
});