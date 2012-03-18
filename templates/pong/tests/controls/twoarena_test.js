module('controls/twoarena', lazy('twoarena'));

test('creates second player', function(){
  
  ok(twoarena.paddle2.has('player'));
  
});