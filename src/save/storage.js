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
	this.storage = window[type+'Storage'];
})
.defines({
	
	length:function(){
		return this.storage.length;
	},
	
	key:function(index){
		return this.storage.key(index);
	},
	
	item:function(key, data){
		
    if(!re.is(data)){
      return JSON.parse(this.storage.getItem(key));
    }
    
		this.storage.setItem(key, JSON.stringify(data));
		
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