/*
The clamp component constraints a value inside a range.

This can be useful for maps, characters, enemies, boxes etc..

re.e('clamp bitmap char.png')
.clamp('posX', 0, 10) //clamps to 0-10
.clamp('health', 0) //minimum 0

//maybe in the future..
//.clamp('name', 'ben', 'roger', 'bob') //clamps name to one of these
//.clamp('name', ['yep', 'beb'])
//.clamp('type, [0, 10, 13])
*/

re.c('clamp')
.method(function(value){
    var c = arguments;

    if(value < c[1]){
        return c[1];
    } else if(c[2] !== undefined && value > c[2]){
        return c[2];
    }

    return value;
})
.defines('clamp',
function(value){
    arguments[0] = this[value];
    this[value] = re.clamp.apply(re, arguments);

    return this;
});