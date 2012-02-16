module('spring', lazy('spring'));

test('flicker animation', function(){
  
  expectFlicker(e, 'bounce');
  
});

test('bounce on touch and key press', function(){
  stub(re, 'pressed', function(key){
    //make sure w key is checked
    equal(key, 'w');
    
    return true;
  });
  
  expectCall(e, 'flicker');
  
  e.touch();
  
});