/*
Entity js
@author Ben D'Angelo

Licensed under MIT http://entityjs.com/license

*/
entity = re = function(selector){
	return new re.query(selector);
}

//automatically filled when compiled
re.version = "$VERSION";
	
//contains all entities
re._e = [];
//contains all components
re._c = {};

re.ready = function(r){
	window.onload = r;
}

/*
The $ method is used for selecting ids and tags.
*/
re.$ = function(s){
	if(s.charAt(0) == '#'){
		return document.getElementById(s.substr(1));
	}
	return document.getElementsByTagName(s);
}