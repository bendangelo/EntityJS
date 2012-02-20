# EntityJS
An HTML5 javascript game engine utlizing the entity-component design. Write highly flexible code in a powerful javascript framework.

[EntityJS Website](http://entityjs.com) | [Demos](http://entityjs.com/demos) | [Tutorials](http://entityjs.com/tutorials) | [API](http://entityjs.com/api)

## Version 0.3

Version 0.3 is a major release with many revisions and a brand new ruby gem to work with. You can now type `entityjs new game-name` and a new game will be created. Of course there are more commands, check below.

There is a new directory structure, testing framework, better minifier, better config file and more.

**Warning:** there are many name changes which will break older entity games!

## API
Currently the [API](http://entityjs.com/api) is out of date. It will slowly be updated everyday.

## What makes this different from other javascript game engines?
Entity strives to be the most flexible game engine available. We understand no one likes rewritting the same functions and lines of code over and over. So we have developed a solution to this problem and that is the component-entity design. The traditional approach to game engine design is creating a hierarchy of classes. This is infact the **most** tightly coupled design. This creates close coupled classes whos functionality is strictly typed to one class, its not easily portable to other projects, good luck copying that one needed function and as game development progresses classes get bigger and more complex. You will eventually end up with *god-classes* who control most of the game logic.

This becomes a big mess.

In the world of *entity-component* designs. All logic is implemented in a *component*, as big or small as you want. You can then create an *entity* and add/remove components to it. The entity is a live represantation of all its components. With this low coupling of components and entities you can mix and match components together to create powerful functionality yet still portable and robust.

## Requirements

You must have at least [Ruby 1.8.1+](http://rubyinstaller.org/).

## Installion

EntityJS is now an easy to install gem. In the terminal type in:

`gem install entityjs`

This will install the latest version of the gem and now you can easily create some games!


## Usage

When using these commands make sure you are always in the root directory of your game.

### Creating a New Game

Creating a game is simple, move to any directory and type in:

`entityjs new mygame`

This will create a new game using the default template.

Create a game with a platform template:

`entityjs new mygame platform`

See all available templates:

`entityjs templates`

### Creating a Component

`entityjs comp rock`

This will create a new component called *rock* at scripts/rock.js and will create a test file inside test/rock.js

`entityjs comp display/hero`

This will create a new component in the directory scripts/display.

### Creating a Test

`entityjs test name test1 test1`

Create a test in tests/name_test.js with two test methods.

### Build Game

`entityjs build`

This will minify all entityjs src code and game src code into one file inside /builds

### Running the Game / Tests

Make sure the server is running:
`entityjs server`

To play visit:
`localhost:2345`

To run tests visit:
`localhost:2345/tests`

Assets are located here:
`localhost:2345/assets/*name`

## Directory Structure

* Assets - Contains all external assets
  * Images - Add any images here and retrieve them with `re.assets.images`
  * Sounds - Add any sounds and retrieve them with `re.assets.sounds`
  * [Custom] - Create any folders or files and they will be available in code.
  * json, tmx, xml, sounds and images are accepted files.

* Builds - Contains all finished builds

* Scripts - Contains all javascript sources.
  * Plugins - Contains external scripts from other authors.

* Tests - Contains test files to run in [QUnit](http://docs.jquery.com/QUnit)

* config.yml - Optional, simple configuration.
* readme.txt - Optional, simple description of the game.
  
## Changes In V0.3

* `Inherit()` is now `defaults()`
* `Extend()` is now `defines()`
* `Inherit()` on entities is now `def()`
* `Extend()` on entities is now `attr()`

There are many more name changes, make sure to read the component source code for help. Most components have a usage example to help you along while the API / tutorials get up to date.

### Short getters and setters

    var tile = re.e('tile');
    tile.tileX(1); //sets
    tile.tileX(); //gets

#### Setters can even be used in `attr()`

    tile.attr('tileX', 2); //sets
  
#### Setter with multiple parameters

    tile.tile(1, 2); //sets tilex and tiley
    //or
    tile.attr('tile', [1,2]); //samething
  
### Signals Changed to on/off

* `addSignal()` is now `on()`
* `removeSignal()` is now `off()`
* `signal()` is now `trigger()`

## QUnit Testing

All games use [QUnit](http://docs.jquery.com/QUnit) for testing, its light weight and easy to use. Checkout the platform template to see some example tests.

### Factories

Factories are used to easily create complex entities. During tests you may need access to a specific type of entity multiple times. Factories make it easy to create any kind of entity at anytime.

Simply create a new `factories.js` in the `/tests` directory and add something like below.
    
    factory('enemy', function(){
      //make a custom coin
      this.health = 100;
      this.state = 'idle';
      
      //can use normal entity methods
      this.on('update', function(){
        //something
      });
    });
    
    //create new enemy entity anywhere in tests
    var e = factory('enemy');
    eq(e.state, 'idle') //true
    
    //Same as...
    var e = re.e('enemy');
    e.health = 100;
    //etc...
    
What if you need multiple enemy factories?

    //use f for laziness
    f('enemy attacking', function(){
      this.state = 'attacking';
    });
    
### EntityJS Helpers

Some asserts have been added for checking entities, like `expectTrigger`, `expectFlicker` and `expectListener`. For more info check `localhost:2345/qunit/qunit.entity.js`.

### Input Helpers

Special methods like `keypress()` and `click()` are available to simulate user input. Check `localhost:2345/qunit/qunit.input.js` for more information.  

## Tile Map Editor

The awesome [tiled map editor](http://www.mapeditor.org/) is now compatible and can be used in your projects. 

Simply create a new directory in /assets named levels or anything you like to save your maps in. They can accessed in code like so:

    re('level1.tmx')[0]; //assuming the file name is level1.tmx
    re('level'); //find all levels that are in the /assets/levels directory

If you are still confused create a new platform game and view how the levels are used.

## Quick Start Guide
First you should install [ruby](http://rubyinstaller.org/) and the [entityjs gem](http://rubygems.org/gems/entityjs). 

Now you can create a new game from the platform template:
`entityjs new mygame platform`

Move into the `mygame` directory and play the game:
`entityjs server`

Open your browser and navigate to `localhost:2345`
