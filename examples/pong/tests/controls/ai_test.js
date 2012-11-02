module('controls/ai', {
  setup:function(){
    ai = f('ai');
    ball = f('ball');
  },
  teardown:function(){
    ai.dispose();
    ball.dispose();
  }
});

test('move towards ball', function(){
  
  ball.posX = 50;
  ball.posY = ai.posY + 40;
  
  expectValueUp(ai, 'posY');
  
  ai.update();
  
});

test('move towards ball', function(){
  
  ball.posX = 50;
  ball.posY = 10;
  
  ai.posY = 40;
  
  expectValueDown(ai, 'posY');
  
  ai.update();
  
});