------------- EntityJS Gem ----------------------

The EntityJS Gem lets you quickly create HTML5 javascript games.

# Directory Structure

## /assets 
Contains all sounds, images and data files. Place all sounds in the sounds directory
and all the images in the images directory. These directories will be looked at
and an asset array will be created for easy asset loading (see scripts/scenes/load.js)

Creating any other directory or placing files in the levels directory will be seen
as data files and will be read and automatically put in js files.

For example, if I have a directory like /assets/animations/monster.json.

The file will automatically be read upon calling 'entityjs refresh' and will be turned into this:

re.e('monster.json animation')
.set(**Animation JSON here**);

Which means you can edit files in different programs and not worry about copying and pasting
the contents. Just run entityjs refresh.

At the moment JSON, XML and TMX is supported but in the future, YAML, and CSV will be supported.
TMX is a special XML format for a tile map editor called tiled.

## /builds

Contains assets and minified code for the game.

## /scripts

Contains javascripts for the game.

## /tests

Contains tests for the game. It is good practice to keep this structured exactly the same as the scripts
directory.

## config.yml

A configuration file in yaml. This can be edited in any text editor.

## readme.txt

Good practice to make one for every game to help other people.

# Commands

## create a new entityjs game
entityjs new [project_name]

- example
entityjs new alien_shooter

- create game with arrow_keys template
entityjs new alien_shooter alien arrow_keys

## create a new component
entityjs comp [component_name]

- example
entityjs comp hero

## build game
entityjs build

Exports game in builds directory

## build game with custom name
entityjs build release1

## Run server
entityjs server
or
entityjs s

Navigate to localhost:2345 to play the game.