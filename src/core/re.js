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
re.version = "RE_VERSION";
    
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
re.$ = $ || function(s){
  return re.$._[s] = re.$._[s] || ((s.charAt(0) == '#') ? document.getElementById(s.substr(1)) : document.getElementsByTagName(s)[0]);
};
//caches dom queries
re.$._ = {};

re.$new = function(n){
    return document.createElement(n);
};

/*
Special polyfills and object additions
*/
re.listener = function(t, c, context){
  (context || window).addEventListener(t, c, true);
};

/*
Checks the existance of a variable or 
*/
re.is = function(obj, type){
  if(arguments.length==1) return obj != null;
  
  return obj != null && Object.prototype.toString.call(obj).slice(8, -1).toLowerCase() == type.toLowerCase();
};