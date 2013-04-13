re.scene('play')
.enter(function(level){
  
  //create group
  this.items = re.g('items').create();

  //offset screen because all tiles are centered..
  //checkout tsprite.js
  re.screen().pos(-re.tile.sizeX * 0.5, -re.tile.sizeY * 0.5);
  
  //display coin text
  var counter = this.counter = re.e('counter');
  
  //find level
  this.level = re('level').load(level)
  
  //let the player collect coins
  //listen for collect events from all coins
  re('items').coins().invoke('on', 'collect', function(){
    counter.add(1);
  });
  
})
.exit(function(){
  this.items.dispose();

  this.counter.dispose();
  
  //teardown level
  if(this.level)
  this.level.teardown();
  
});