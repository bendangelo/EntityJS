/*
The class is the base class for system and group. Eventually will be the base for component too.
*/
re.class = function(){

};

re.class.extend = function(obj){
	
};

re.class.prototype = {

	tag:function(name){
		if(name!=null){
			this._tag = name;
			re._t[name] = this;
		}
		return this._tag;
	}

};