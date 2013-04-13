module('spring', lazy('spring'));

test('bounce on touch and key press', function(){
  stub(re, 'pressed', true);
  
  expectCall(spring, 'animate');
  
  spring.touch();
  
});