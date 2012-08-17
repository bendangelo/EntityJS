/*
The support component contains information about supported 
functionality of the browser.

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
re.support = function(s){
		if(arguments.length > 1){
			//find first supported arg and return
			
			var d;
			for(var i=0; i<arguments.length; i++){
				d = arguments[i];
				if(re.support(d)){
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
				stat = stat && !!re.support[k[j]];
		}
		
		return stat;
}
	
	//add supports to component
	var c = re.support;
	
	//check canvas support
	c.canvas = !!document.createElement('canvas').getContext;
	
	//check for text support
	c.text = !!(c.canvas && typeof document.createElement('canvas').getContext('2d').fillText == 'function');
	
	//check audio support
	var ele = document.createElement('audio');
	
	try {
	
		if(c.audio = !!ele.canPlayType){
			
			c.ogg  = ele.canPlayType('audio/ogg; codecs="vorbis"');
			c.wav  = ele.canPlayType('audio/wav; codecs="1"');
			c.webma = ele.canPlayType('audio/webm; codecs="vorbis"');
			c.mp3  = ele.canPlayType('audio/mpeg; codecs="mp3"');
			c.m4a = ele.canPlayType('audio/mp4; codecs=mp4a.40.2');
			
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
	
	c.touch = 'ontouchstart' in window;
	