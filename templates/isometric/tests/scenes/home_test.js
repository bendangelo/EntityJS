module('scenes/home', {
  setup:function(){
    re.scene('home').enter();
  }
});

test('entities should exist', function(){
  
  var circle = re('circle')[0];
  
  is(circle);
  
  //has update listener
  expectEvent(circle, 'update');
  
  var xBefore = circle.posX;
  
  //moves upon keypress
  keypress('a', function(){
    //key is currently down, so call update method
    circle.trigger('update');
  });
  
  //check if the circle moved
  ok(xBefore != circle.posX);
  
  //text exists
  is(re('text')[0]);
});
