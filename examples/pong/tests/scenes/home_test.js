module('scenes/home', {
  setup:function(){
    re.scene('home').enter();
  },
  teardown:function(){
    re.scene('home').exit();
  }
});

test('create home screen', function(){
  
  is(re('text')[0]);
  
});

test('z should go to single player', function(){
  
  expectCall(re.scene('game'), 'enter', [false]);
  
  keyup('z');
  
});

test('x should go to two player', function(){
  
  expectCall(re.scene('game'), 'enter', [true]);
  
  keyup('x');
  
});