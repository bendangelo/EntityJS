# EntityJS
An HTML5 javascript game engine utlizing the entity-component design. Write highly flexible code in a powerful javascript framework.

[EntityJS Website](http://entityjs.com) | [Demos](http://entityjs.com/demos) | [Tutorials](http://entityjs.com/tutorials) | [API](http://entityjs.com/api)

## What makes this different from other javascript game engines?
Entity strives to be the most flexible game engine available. We understand no one likes rewritting the same functions and lines of code over and over. So we have developed a solution to this problem and that is the component-entity design. The traditional approach to game engine design is creating a hierarchy of classes. This is infact the **most** tightly coupled design. This creates close coupled classes whos functionality is strictly typed to one class, its not easily portable to other projects, good luck copying that one needed function and as game development progresses classes get bigger and more complex. You will eventually end up with *god-classes* who control most of the game logic.

This becomes a big mess.

In the world of *entity-component* designs. All logic is implemented in a *component*, as big or small as you want. You can then create an *entity* and add/remove components to it. The entity is a live represantation of all its components. With this low coupling of components and entities you can mix and match components together to create powerful functionality yet still portable and robust.

## Requirements

You must have [ruby 1.9.0](http://rubyinstaller.org/) or higher installed.

## Installion

EntityJS is now an easy to install gem. In the terminal type in:

`gem install entityjs`

This will install the latest version of the gem and now you can easily create some games!


## Usage

**Warning** at the moment the gemfile is at version 0.2.2 and is **broken**. Wait until version 0.3 to try these commands.

When using these commands make sure you are always in the root directory of your game.

### Creating a New Game

Creating a game is simple, move to any directory and type in:

`entityjs new mygame`

or create with components

`entityjs new mygame comp1 comp2`

### Creating a Component

`entityjs comp rock`

This will create a new component called *rock* at src/rock.js and will create a test file inside test/rock.js

`entityjs comp display/hero`

This will create a new component in the directory src/display instead of src/ like before.

### Compiling Code

`entityjs min`

This will minify all entityjs src code and game src code into one file inside /lib

### Refreshing Sources

`entityjs refresh`

When adding new images, sounds or src code it will not be available in play.html until you refresh.

## Game Structure

**coming soon...**

## New In V0.3

* `Inherit()` is now `defaults()`

### Signals Changed to bind/unbind

* `addSignal()` is now `bind()`
* `removeSignal()` is now `unbind()`
* `signal()` is now `trigger()`

## Quick Start Guide
This will take you through some quick steps to display an image on a canvas element.

* In the terminal:
`entityjs new mygame`

* Add an image to `mygame/assets/images` call it welcome.png

* Refresh srcs to find the image: `entityjs refresh`

* In `mygame/src/scenes/load.js` add at the bottom:

```
re.scene('home')
.enter(function(){
  re.e('welcome.png bitmap');
});
```

* Open up mygame/play.html to view your game

* In the root directory type: `entityjs min`

* Checkout `/mygame/lib/min` to see your finished game

* You can now upload the game online and show people.

## Future
* Ruby YUI compiler
* Level Editor
* Testing
* More tutorials!