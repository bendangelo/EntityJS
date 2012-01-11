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
	re.ready.c.push(r);
	
	window.onload = function(){
		for(var k in re.ready.c){
			re.ready.c[k].call(re);
		}
	};
};
re.ready.c = [];

/*
The $ method is used for selecting ids and tags.
*/
re.$ = function(s){
		return /*re.$.c[s] = re.$.c[s] ||*/ (s.charAt(0) == '#') ? document.getElementById(s.substr(1)) : document.getElementsByTagName(s);
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
  return obj != null && (type || Object.prototype.toString.call(obj).slice(8, -1).toLowerCase() == type.toLowerCase());
};

if(!Array.prototype.indexOf){
	Array.prototype.indexOf = function(o){
		for(var i=0; i<this.length; i++){
			if(this[i]==o){
				return i;
			}
		}
		return -1;
	}
}