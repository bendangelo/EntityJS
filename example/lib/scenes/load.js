re.scene('load')
.enter(function(){

  re.assets = [
      "images/bit.png",
      "images/hero.png",
      "images/items.png",
      "images/tiles.png"
  ];

  re.tile.sizeX = re.tile.sizeY = 25;

  re.loop().clearColor = '#D6F8FA';

  //setup gravity
  re.force.graY = 30 * re.loop().stepSize;

  re.load(re.assets)
  .complete(function(){

    //move to home
    re.scene('home').enter();
  })
  .error(function(e){

  })
  .progress(function(i){

  });

})
.exit(function(){
  //exit load scene
});