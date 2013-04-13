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
.method(function(value, h, l){
    
    if(value < h){
        return h;
    } else if(l != null && value > l){
        return l;
    }

    return value;
})
.defines('clamp',
function(value){
    //replae with real value
    var arg = Array.prototype.slice.apply(arguments);
    arg[0] = this.get(value);
    this.set(value, re.clamp.apply(re, arg));
    
    return this;
});