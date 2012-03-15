module('level', {
  setup:function(){
    //take existing level
    e = re('level1.tmx')[0];
  }
});

test('build level', function(){
  
  e.build();
  
  //some simple smoke tests
  ok(re('hero').length != 0);
  
  ok(re('tile').length != 0);
  
  ok(re('item').length != 0);
  
  //should probably write better tests
});

test('teardown level', function(){
  
  //does nothing in code
  e.teardown();
  
  //todo write tests...
  //ok(re('hero').length == 0)
  
  //stops qunit from complaining
  expect(0)
});