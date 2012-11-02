module('spring', lazy('spring'));

test('bounce on touch and key press', function(){
  stub(re, 'pressed', function(key){
    //make sure w key is checked
    equal(key, 'w');
    
    return true;
  });
  
  expectCall(spring, 'flicker');
  
  spring.touch();
  
});