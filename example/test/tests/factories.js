/*
The factories file should define factories for creating various entities.
A factory is an easy way to create complex entities for testing.
*/
factory('spring', function(){
  this.hero = re.e('hero');
});

factory('item', function(){
  this.hero = re.e('hero');
})

//can also use f
f('hero', function(){
  //this is a fake value because factories 
  //don't have much use in this project
  this.health = 100;
  
  //all normal methods are available too
  this.on('update', function(){
    //something
  });
});

/*
Create an entity from a factory..

var hero = f('hero') //new entity
hero.health = 100;
*/

//re.ready() is DISABLED during testing
re.listener('load', function(){
	re.loop().init(re.canvas).start();
});