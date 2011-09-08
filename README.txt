--------------- Retrojs -----------
      Javascript game engine

----------- Intro
Retrojs is a new html5 javascript game engine. It utilizes the entity-component paradigm to create flexible, reuable, robust html5 games. 

----------- What makes this different from other game engines?
Retrojs strives to be the most flexible game engine available. We understand no one likes rewritting the same functions and lines of code over and over. So we have developed a solution to this problem and that is the component-entity design pattern.

The traditional approach to game design is creating a hierarchy of classes. This is actually one of the worst game designs possible. It creates tightly coupled classes whos functionality is strictly typed to one class and as game development goes on classes get bigger and more complex.

You will eventually end up with god-classes who control most of the game logic.

This becomes a big mess.

In the world of entity-component designs. All logic is implemented in a component, as big or small as you want. You can then create an entity and add components to it. The entity is a live represantation of components.

In other words:
components = classes
entities = instances

The only difference is classes can be removed or added to entities at anytime.

----------- Query System

coming soon .. . 