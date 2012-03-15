module('load');

test('load stuff', function(){
  
  stub(re.scene('home'), 'enter', function(){start(); console.log('entered')});
  
  re.scene('load').enter();
  
  stop();
  
  expect(0)
});