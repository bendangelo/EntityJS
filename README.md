# Entity JS
An HTML5 javascript game engine utlizing the entity-component design. Write highly flexible code in a powerful javascript framework.

[EntityJS Website](entityjs.com) 		[Demo](entityjs.com/demo) 	[Tutorials](entityjs.com/tutorials)	[API](entityjs.com/api)

## What makes this different from other javascript game engines?
Entity strives to be the most flexible game engine available. We understand no one likes rewritting the same functions and lines of code over and over. So we have developed a solution to this problem and that is the component-entity design. The traditional approach to game engine design is creating a hierarchy of classes. This is infact the **most** tightly coupled design. This creates close coupled classes whos functionality is strictly typed to one class, its not easily portable to other projects, good luck copying that one needed function and as game development progresses classes get bigger and more complex. You will eventually end up with *god-classes* who control most of the game logic.

This becomes a big mess.

In the world of *entity-component* designs. All logic is implemented in a *component*, as big or small as you want. You can then create an *entity* and add/remove components to it. The entity is a live represantation of all its components. With this low coupling of components and entities you can mix and match components together to create powerful functionality yet still portable and robust.

## Directory Structure

* build - Contains two build commands to compile entityjs code.
	* build_min.bat - Will build a minified version for release.
	* build_debug.bat - Will build a debug file for testing offline.
* lib - Contains two compiled sources *entity.min.js* and *entity.debug.js*
* src - Contains source code of *entityjs*
* tutorials - Contains simple tutorials and examples.

## Quick Start Guide
This will take you through some quick steps to display an image on a canvas element.

* Include *entity.min.js* to your document (All compiled sources can be found in */lib*).

* Initialize the system by calling *re.system.init*.

	`var fps = 30;
re.system.init('#canvasId', fps);`

* Start the *main loop* of the application. This will refresh the screen and update logic.

	`re.system.start();`

* We now have to load our image *welcome.png*.

	<code>re.load('welcome.png')
.success(function(){ });</code>

* Now inside the success function body we can display the image. *re.entity* creates a new entity with the given components.

	`re.entity('bitmap welcome.png');`

That should now display an image on your canvas. Yes!