module('counter', lazy('counter'));

test('add value', function(){
  
  e.add(1);
  
  eq(e.add(), 1);
  
})