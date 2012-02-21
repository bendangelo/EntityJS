/*
EntityJS Javascript Game Engine
Copyright 2011, Ben D'Angelo 
http://entityjs.com

Licensed under MIT http://entityjs.com/license

*/
re = function(selector){
    return new re.query(selector);
};

//automatically filled when compiled
re.version = "$VERSION";
    
//contains all entities
re._e = [];
//contains all components
re._c = {};

re.ready = function(r){
    re.listener('load', r);
};

/*
The $ method is used for selecting ids and tags.
*/
re.$ = function(s){
  return re.$.c[s] = re.$.c[s] || ((s.charAt(0) == '#') ? document.getElementById(s.substr(1)) : document.getElementsByTagName(s)[0]);
};
//caches dom queries
re.$.c = {};

re.$new = function(n){
    return document.createElement(n);
};

/*
Special polyfills and object additions
*/
re.listener = function(t, c){
    if(window.addEventListener){
        window.addEventListener(t, c, true);
    } else {
        document.attachEvent('on'+t, c);
    }
};

/*
Checks the existance of a variable or 
*/
re.is = function(obj, type){
  if(arguments.length==1) return obj != null;
  
  return obj != null && Object.prototype.toString.call(obj).slice(8, -1).toLowerCase() == type.toLowerCase();
};

/*
Crossbrowser indexof 
re.indexOf([1,2,3], 1) //0
*/
re.indexOf = function(z, a,f){for(var c=z.length,r=-1,d=f>>>0;~(c-d);r=z[--c]===a?c:r);return r};

/*
Crossbrowser lastindexof
re.lastIndexOf([1,2,3], 2) //1
*/
re.lastIndexOf = function(
  z,
   a, // item to be found
   b  // index placeholder
) { 
   for (
     // initialize index
     b=z.length;
     // if the index decreased by one is not already -1
     // index is not set (sparse array)
     // and the item at index is not identical to the searched one
     ~--b && (!(b in z) || z[b] !== a););
   // return index of last found item or -1
   return b
};