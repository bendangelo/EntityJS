/*
The storage component contains methods for storing locally or session values.
This utilizes the new HTML5 localstorage and sessionstorage.

//create new local storage
re.e('storage:local');

//create new session storage
re.e('storage:session');

*/
re.c('storage')
.init(function(c, type){
	this.storage = (type == 'session')? sessionStorage : localStorage;
})
.define({
	
	length:function(){
		return this.storage.length;
	},
	
	key:function(index){
		return this.storage.key(index);
	},
	
	getItem:function(key){
		return this.storage.getItem(key);
	},
	
	getJson:function(key){
		return JSON.parse(this.getItem(key));
	},
	
	setItem:function(key, data){
		
		if(typeof data != 'number' || typeof data != 'string'){
			data = JSON.stringify(data);
		}
		
		this.storage.setItem(key, data);
		
		return this;
	},
	
	removeItem:function(key){
		this.storage.removeItem(key);
		
		return this;
	},
	
	clear:function(){
		this.storage.clear();
		
		return this;
	}
	
})