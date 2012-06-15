module('hero', lazy('hero'));

test('has animations', function(){
  
  //these where manually put in
  is(hero.animates.idle);
  is(hero.animates.run);
  is(hero.animates.jump);
  is(hero.animates.ladder);
  
});

test('has components', function(){
  ok(hero.has('hero.png tsprite update force flicker body'));
});

test('flickers idle when not moving', function(){
  
  hero.animate('run');
  
  stub(hero, 'isIdle', true);
  
  hero.update();
  
  ok(hero.flickering('idle'));
  
});

test('moves right', function(){
  
  expectCall(hero, 'flicker');
  
  keypress('d', function(){
    hero.update();
  });
  
  
});

test('moves left', function(){
  
  expectCall(hero, 'flicker');
  
  keypress('a', function(){
    hero.update();
  });
  
});

test('jumps when w pressed', function(){
  
  //setup requrements for jumping
  hero.ground = true;
  hero.jump = false;
  
  expectCall(hero, 'forceJump');
  
  keypress('w', function(){
    hero.update();
  });
  
});

test('resets jump when hitting the y axis', function(){
  
  hero.ground = false;
  hero.jump = true;
  
  hero.jumpReset(false, true, 10, 999);
  
  ok(hero.ground);
  ok(!hero.jump);
  
});