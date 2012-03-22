module('displays/ball', lazy('level box', function(){
  ball = level.ball;
}));

test('move up correctly', function(){
  stop();
  
  ball.on('move:finish', function(){
    start();
    eq(this.tileY(), 0);
  });
  
  ball.tileY(2);
  
  keydown('w');
  
});

test('move down correctly', function(){
  stop();
  
  ball.on('move:finish', function(){
    start();
    eq(this.tileY(), level.map.length-1);
  });
  
  keydown('s');
  
});

test('move right correctly', function(){
  stop();
  
  ball.on('move:finish', function(){
    start();
    eq(this.tileX(), level.map[0].length-1);
  });
  
  ball.tileX(0);
  
  keydown('d');
  
});

test('move left correctly', function(){
  stop();
  
  var width = level.map[0].length -1;
  
  ball.on('move:finish', function(){
    start();
    eq(this.tileX(), 0);
  });
  
  ball.tileX(width);
  
  keydown('a');
  
});