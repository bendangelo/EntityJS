# EntityJS
An HTML5 javascript game engine utlizing the entity-component design. Write highly flexible code in a powerful javascript framework.

[EntityJS Website](http://entityjs.com) | [Demos](http://entityjs.com/demos) | [Tutorials](http://entityjs.com/tutorials) | [API](http://entityjs.com/api)

## Version 0.5.0

Systems and groups have been added. Groups are used to contain similar entities and can be used for searches or in systems. Systems should contain all the logic of a game, like updates, drawing and input. Components should only add attributes to an entity while systems will run everything together using groups.

## API
Currently the [API](http://entityjs.com/api) is out of date. It will slowly be updated everyday.

## What makes this different from other javascript game engines?
Entity strives to be the most flexible game engine available. We understand no one likes rewritting the same functions and lines of code over and over. So we have developed a solution to this problem and that is the component-entity design. The traditional approach to game engine design is creating a hierarchy of classes. This is infact the **most** tightly coupled design. This creates close coupled classes whos functionality is strictly typed to one class, its not easily portable to other projects, good luck copying that one needed function and as game development progresses classes get bigger and more complex. You will eventually end up with *god-classes* who control most of the game logic.

This becomes a big mess.

In the world of *entity-component* designs. All logic is implemented in a *component*, as big or small as you want. You can then create an *entity* and add/remove components to it. The entity is a live represantation of all its components. With this low coupling of components and entities you can mix and match components together to create powerful functionality yet still portable and robust.

## Requirements

* NodeJS
* NPM

## Installion

Run this command:

`npm install entity -g`

You can now create a new game:

`entity new mygame`

Download all used packages:

`npm install`

## Directory Structure

* Assets - Contains all external assets
  * Images
  * Sounds
  * Stylesheets
  * Vendor

* Dest - contians compiled files, these do not need to be saved.

* Lib - Contains all js, coffee sources. Xml, tmx and json files will be converted into js.

* Test - Contains test files to run in [QUnit](http://docs.jquery.com/QUnit)

* GruntFile.js - Configure tasks

### Short getters and setters

    var tile = re.e('tile');
    tile.tileX(1); //sets
    tile.tileX(); //gets

#### Setters can even be used in `set()`

    tile.set('tileX', 2); //sets

#### Setter with multiple parameters

    tile.tile(1, 2); //sets tilex and tiley
    //or
    tile.set('tile', [1,2]); //samething

## Mocha Testing

All games use [Mocha](http://visionmedia.github.io/mocha/) Test Framework by default but this can be changed. Sinon, Chai and other tools are available as well. Checkout the test/js directory.

## Contributing

Before sending a pull request it would be a good idea to run `rspec` and `rake jasmine` to make sure all tests pass in both ruby and javascript.

Running rspec will generate a /mygame/ folder with test files. It will be ignored by git so don't worry about it.

## Change Log

### 0.5.0
* Ruby completely removed, now run by NodeJS
* Moved to Grunt for task running
* No more magic behind the scenes, all tasks and files can be customized
* Added new group class
* Added new system class
* Removed global entity searching (use groups)