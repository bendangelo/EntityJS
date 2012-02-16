module('coin', lazy('coin'));

test('valid', function(){
  
  expectListener(e, 'update');
  
  expectFlicker(e, 'glow');
  
});

test('touch should collect', function(){
  
  expectCall(e, 'collect');
  
  e.touch();
  
})

test('collect should dispose and stuff', function(){
  
  expectCall(e.sfx, 'play');
  expectCall(e, 'dispose');
  
  expectTrigger(e, 'collect');
  
  e.collect();
  
})