module('coin', {
  setup:function(){
    c = re.e('coin');
  },
  teatdown:function(){
    c.dispose();
  }
});

test('touch should collect', function(){
  
  expectCall(c, 'collect');
  
  c.touch();
  
})

test('collect should dispose and stuff', function(){
  
  expectCall(c.sfx, 'play');
  expectCall(c, 'dispose');
  
  expectTrigger(c, 'collect');
  
  c.collect();
  
})