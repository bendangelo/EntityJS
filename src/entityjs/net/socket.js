/*
The socket component is an interface for the new HTML5 websockets.

Its safe to use this abstraction incase specs change in the future.

*/
re.c('socket')
.define({
	
	connect:function(address){
		
		this.socket = new WebSocket(address);
		
	},
	
	close:function(){
		if(!this.socket) return this;
		
		this.socket.close();
		
		return this;
	},
	
	open:function(callback){
		if(!this.socket) return this;
		
		this.socket.onopen = callback;
		
	},
	
	error:function(callback){
		if(!this.socket) return this;
		
		this.socket.onerror = callback;
		
	},
	
	message:function(callback){
		if(!this.socket) return this;
		
		this.socket.onmessage = callback;
		
	},
	
	send:function(){
		if(!this.socket) return this;
		
		this.socket.send.apply(this.socket, arguments);
		
	}
	
});