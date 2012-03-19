module('load');

test('load assets', function(){
  
  //replace re.scene('home').enter with start()
  stub(re.scene('home'), 'enter', function(){  start(); });
  
  //go into the load scene
  re.scene('load').enter();
  
  //it should be loading the assets
  //stop until it finishes and enters the new home scene
  //the home scene should then call start()
  stop();
  
  expect(0);
  
});