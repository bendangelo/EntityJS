module('tiles/walltile', lazy('walltile'));

test('display correctly', function(){
  
  //testing the visual
  //use stop() to see it
  walltile.topWall = true;
  walltile.bottomWall = true;
  walltile.leftWall = true;
  walltile.rightWall = true;
  
  expect(0);
  
});

//these are mostly smoke tests
//just making sure the methods don't crash
test('create factory wall tile', function(){
  
  ok(re.walltile.factory(1).topWall);
  
});

test('checkWall', function(){
  walltile.topWall = true;
  
  ok(walltile.checkWall(0, 1));
  
});

test('checkWallInside', function(){
  walltile.bottomWall = true;
  
  ok(walltile.checkWallInside(0, 1));
  
});