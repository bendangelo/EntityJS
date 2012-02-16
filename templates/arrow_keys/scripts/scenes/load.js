/*
The load scene loads all images and sounds in the game.

The re.assets object contains two arrays:

re.assets.images
re.assets.sounds

re.assets is automatically created for you and will contains whatever images
you place in the /assets/images or /assets/sounds directory.

You can even create new directories and place json or xml inside.

/assets/levels/level1.json

The file contents will be turned into a component and can be used on entities.

If /assets/levels/level1.json contains this:

{"something":100}

It will do this in the background for you:

re.c('level1.json level')
.defines({
  something:100
});

You can even look in the source code and see for yourself.

Of course this will all be included when you run 'entityjs build'

Currently only, json, xml and tmx are supported. Tmx is a special file type used by
the map maker tiled and it can be used to create levels. More info: http://www.mapeditor.org/

*/
re.scene('load')
.enter(function(){
  
  re.load(re.assets)
  .complete(function(){
    console.log('finished loading...');
    
    //move to home
    re.scene('home').enter();
  })
  .error(function(e){
    console.log('Error loading asset: '+e);
  })
  .progress(function(i){
    console.log('Finished loading: '+i);
  });
  
})
.exit(function(){
  //exit load scene
})