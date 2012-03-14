module('arrow');

var arrow = re.e('arrow');

//verify the arrow has the correct sizes
test('size', function(){
  
  equal(arrow.sizeX, 40);
  equal(arrow.sizeY, 40);
  
});

test('keys move arrow', function(){
  
  //mock/stub methods in qunit/qunit.mock.js
  //expects 4 calls to frame
  expectCall(arrow, 'frame', 4);
  
  //simulate keypress / mouse clicks with qunit/qunit.input.js
  //dispatches a keydown on each key, calls the given method
  //then dispatches keyup.
  keypress(['w', 's', 'd', 'a'], function(){
    arrow.update();
  });
  
  //by the end of the method e.frame() should have been called 4 times
  //take a look at scripts/display/arrow.js @ update()
  
});