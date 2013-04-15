module('load');

test('load stuff', function(){
  
  stub(re.scene('home'), 'enter', function(){start();});
  
  re.scene('load').enter();
  
  stop();
  
  expect(0)
});