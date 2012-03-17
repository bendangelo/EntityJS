module('controls/player', lazy('player'));

test('paddle moves down on w press', function(){
  
  player.posY = 30;
  
  expectValueDown(player, 'posY');
  
  keypress('w', function(){
    player.update();
  });
  
});

test('paddle moves up on s press', function(){
  
  player.posY = 10;
  
  expectValueUp(player, 'posY');
  
  keypress('s', function(){
    player.update();
  });
  
});