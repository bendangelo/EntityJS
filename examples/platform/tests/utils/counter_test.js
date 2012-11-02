module('counter', lazy('counter'));

test('add value', function(){
  
  counter.add(1);
  
  eq(counter.add(), 1);
  
})