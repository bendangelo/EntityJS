re.scene('play')
.enter(function(level){
  
  //offset screen because all tiles are centered..
  //checkout tsprite.js
  re.screen.pos(-re.tile.sizeX * 0.5, -re.tile.sizeY * 0.5);
  
  //display coin text
  var counter = this.counter = re.e('counter');
  
  //find level
  this.level = re(level+'.tmx')[0];
  
  //load it
  this.level.build();
  
  //let the player collect coins
  //listen for collect events from all coins
  re('coin').on('collect', function(){
    counter.add(1);
  });
  
})
.exit(function(){
  
  this.counter.dispose();
  
  //teardown level
  this.level.teardown();
  
});