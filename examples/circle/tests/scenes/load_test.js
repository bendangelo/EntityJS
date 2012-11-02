module('scenes/load');

test('load stuff', function(){
  
  stop();
  
  stub(re.scene('home'), 'enter', function(){
    start();
  });
  
  re.scene('load').enter();
  
  
  expect(0);
});