------------- EntityJS Gem ----------------------

The EntityJS Gem lets you quickly create and export HTML5 javascript games.

# Commands

## create a new entityjs game
entityjs new [project_name] [comps]+

- example
entityjs new alien_shooter

- example with components
entityjs new alien_shooter alien hero lazer

This will create a new game called 'alien_shooter'
with three components, alien, hero, lazer

## create a new component
entityjs comp [component_name]

- example
entityjs comp hero

## export game
entityjs min

## refresh sources
entityjs refresh