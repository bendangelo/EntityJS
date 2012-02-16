module('item', lazy('item'));

test('has components', function(){
  
  ok(e.has('tsprite update items.png'))
  
});

test('update method', function(){
  
  //touching default to false
  ok(!e.touching)
  
  expectListener(e, 'update');
  
});

test('hitting hero should call touch', function(){
  
  expectCall(e, 'touch');
  
  //fake hitBody and always return true
  stub(e.hero, 'hitBody', function(){ return true; });
  
  e.item_update();
  
  //should call untouch afterwards
  
  //force hitbody to always return false now...
  stub(e.hero, 'hitBody', function(){ return false; });
  
  expectCall(e, 'untouch');
  
  e.item_update();
  
});