module('controls');

var controls = re.e('controls');

test('addArrow', function(){
  
  var old = re('arrow').length;
  
  //should call addarrow
  expectCall(controls, 'addArrow');
  
  //press space
  keypress('space');
  
  //check that a new arrow was created
  equal(re('arrow').length, old+1);
  
});

test('removeArrow', function(){
  
  var old = re('arrow').length;
  
  expectCall(controls, 'removeArrow');
  
  //press r
  keypress('r');
  
  //check that a new arrow was removed
  equal(re('arrow').length, old-1);
  
});