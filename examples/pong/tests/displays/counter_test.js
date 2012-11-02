module('displays/counter', lazy('counter'));

test('counting up should trigger win', function(){
  
  counter.name = 'blah';
  counter.maxCount = 1;
  counter.count = 0;
  
  expectTrigger(counter, 'max', [counter.name]);
  
  counter.up();
  
});