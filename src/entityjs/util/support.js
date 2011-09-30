/*
The support component contains information about supported 
functionality of the browser.

v0.1 currently only checks for support of canvas and canvas text.

FUTURE
-check audio support

//returns true if canvas AND text is supported
if(re.support('canvas text')){
	//supports
}

//checks all arguments and returns first thing thats supported
re.support('ogg', 'aac', 'mp3', 'wav');

//find first supported storage storage
re.support('database', 'localstorage');

this is helpful to find a supported codec or a storage component

or add to entity

re.e('support').support('canvas');

---- possible support checks
canvas
text
audio
ogg
mp3
wav
aac
localstorage
worker
webgl

*/
re.c('support')
.global({

	support:function(s){
		var that = re.c('support');
		
		if(arguments.length > 1){
			//find first supported arg and return
			
			var d;
			for(var i=0; i<arguments.length; i++){
				d = arguments[i];
				if(that.support(d)){
					return d;
				}
			}
			
			return false;
		}
		
		//find if supported
		var k = s.split(' ');
		
		var stat = true;
		
		//check multiple supports
		for(var j in k){
				stat = stat && !!that[k[j]];
		}
		
		return stat;
	}
	
})
.define({
	support:function(s){
		return re.c('support').call(this, s);
	}
	
})
.run(function(){
	
	//add supports to component
	var c = re.c('support');
	
	//quick checking function
	re.support = c.support;
	
	//check canvas support
	c.canvas = !!document.createElement('canvas').getContext;
	
	//check for text support
	c.text = !!(c.canvas && typeof document.createElement('canvas').getContext('2d').fillText == 'function');
	
	//check audio support
	var ele = document.createElement('audio');
	
	try {
	
		if(c.audio = !!ele.canPlayType){
			
			c.ogg  = ele.canPlayType('audio/ogg; codecs="vorbis"');
			c.mp3  = ele.canPlayType('audio/mpeg;');
			c.wav  = ele.canPlayType('audio/wav; codecs="1"');
			c.aac = ele.canPlayType('audio/x-m4a;') || ele.canPlayType('audio/aac;');
			
			//switch unsupported codecs to false
			for(var i in c){
				if(c[i] == 'no' || c[i] == ''){
					c[i] = false;
				}
			}
			
		}
		
	} catch(e){}
	
	//check local storage
	try {
		c.localstorage = !!localStorage.getItem;
	} catch(e){
		c.localstorage = false;
	}
	
	//check web worker
	c.worker = !!window.Worker;
	
	//check webgl
	c.webgl = !!window.WebGLRenderingContext;
	
});