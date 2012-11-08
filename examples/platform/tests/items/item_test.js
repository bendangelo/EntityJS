module('item', lazy('item'));

test('has components', function(){
  
  ok(item.has('tsprite update items.png'))
  
});

test('hitting hero should call touch', function(){
  
  expectCall(item, 'touch');
  
  //fake hitBody and always return true
  stub(item.hero, 'hitBody', true);
  
  item.item_update();
  
  //should call untouch afterwards
  
  //force hitbody to always return false now...
  stub(item.hero, 'hitBody', false);
  
  expectCall(item, 'untouch');
  
  item.item_update();
  
});