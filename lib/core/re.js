/*
EntityJS Javascript Game Engine
Copyright 2011, Ben D'Angelo 
http://entityjs.com

Licensed under MIT http://entityjs.com/license

*/
re = function(selector){
	if(typeof selector == 'string'){
    if(selector[0] == '#'){
      //return tagged item
  	  return re._t[selector.slice(1)];
    } else {
      //return group
      return re._g[selector];
    }
	}

  //return array
  return new re.array(selector);
};

//automatically filled when compiled
re.version = "RE_VERSION";

//contains all components
re._c = {};
//contains all systems
re._s = {};
//contains all groups
re._g = {};
//contains all tags
//tags are used to reference entities
re._t = {};

re.ready = function(r){
  re.listener('load', r);
};

/*
The $ method is used for selecting ids and tags.
*/
re.$ = function(s){
  return re.$._[s] = re.$._[s] || ((s.charAt(0) == '#') ? document.getElementById(s.substr(1)) : document.getElementsByTagName(s)[0]);
};
//caches dom queries
re.$._ = {};

re.$new = function(n){
  if(n)
    return document.createElement(n);
};

/*
Special polyfills and object additions
*/
re.listener = function(t, c, target){
  (target || window).addEventListener(t, c, true);
};

/*
Checks the existance of a variable or 
*/
re.is = function(obj, type){
  if(arguments.length==1) return obj != null;
  
  return obj != null && Object.prototype.toString.call(obj).slice(8, -1).toLowerCase() == type.toLowerCase();
};