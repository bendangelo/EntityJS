module('displays/ball', lazy('level box', function(){
  ball = level.ball;
}));

test('move up correctly', function(){
  stop();
  
  ball.on('move:finish', function(){
    eq(this.tileY(), 0);
    start();
  });
  
  ball.tileY(1);
  
  keypress('w', function(){
    ball.update();
  });
  
});

test('move down correctly', function(){
  stop();
  
  ball.on('move:finish', function(){
    eq(this.tileY(), level.map.length-1);
    start();
  });
  
  keypress('s', function(){
    ball.update();
  });
  
});

test('move right correctly', function(){
  stop();
  
  ball.on('move:finish', function(){
    eq(this.tileX(), level.map[0].length-1);
    start();
  });
  
  ball.tileX(0);
  
  keypress('d', function(){
    ball.update();
  });
  
});

test('move left correctly', function(){
  stop();
  
  var width = level.map[0].length -1;
  
  ball.on('move:finish', function(){
    eq(this.tileX(), 0);
    start();
  });
  
  ball.tileX(width);
  
  keypress('a', function(){
    ball.update();
  });
  
});