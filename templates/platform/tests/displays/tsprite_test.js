module('tsprite', lazy('tsprite'));

test('valid', function(){
  
  eq(tsprite.sizeX, re.tile.sizeX)
  eq(tsprite.sizeY, re.tile.sizeY)
  
});