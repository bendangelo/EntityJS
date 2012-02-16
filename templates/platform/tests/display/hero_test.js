module('hero', lazy('hero'));

test('has flicks', function(){
  
  expectFlicker(e, 'idle');
  expectFlicker(e, 'run');
  expectFlicker(e, 'jump');
  expectFlicker(e, 'ladder');
  
});

test('has components', function(){
  ok(e.has('hero.png tsprite update force flicker body'));
});

test('flickers idle when not moving', function(){
  
  e.flicker('run');
  
  stub(e, 'isIdle', function(){return true});
  
  e.update();
  
  ok(e.flickering('idle'));
  
});

test('moves right', function(){
  
  expectCall(e, 'flicker');
  
  keypress('d', function(){
    e.update();
  });
  
  
});

test('moves left', function(){
  
  expectCall(e, 'flicker');
  
  keypress('a', function(){
    e.update();
  });
  
});

test('jumps when w pressed', function(){
  
  //setup requrements for jumping
  e.ground = true;
  e.jump = false;
  
  expectCall(e, 'forceJump');
  
  keypress('w', function(){
    e.update();
  });
  
});

test('resets jump when hitting the y axis', function(){
  
  e.ground = false;
  e.jump = true;
  
  e.jumpReset(false, true, 10, 999);
  
  ok(e.ground);
  ok(!e.jump);
  
});