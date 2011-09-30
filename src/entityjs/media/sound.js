/*
The sound component utilizes the new HTML5 to play sound effects in the web browser.
It is reccommended to load two sound codecs OGG and AAC because not every browser supports
all sound codecs at this time.

//load a sound
re.load('run.ogg run.aac');
//BAD this will load both sounds. Even if the browser might not support one

//GOOD. load just one codec of the sound
var codec;
if(re.support('ogg')){
	codec = 'ogg';
} else if(re.support('aac')){
	codec = 'aac';
}

re.load('run.'+codec');

//create sound
re.e('sound run.'+codec);

//that is a pain, so a helper method has been created
re('sound run.'+re.support('ogg', 'aac'));

Its reccomended to save the supported codec somewhere globaly
//like so...
re.codec = re.support('ogg', 'aac');

re.load('run.'+re.codec);

re.e('run.'+re.codec);

WARNING: Because the sound component has generic
method names stop, play, watchout for overwrites.

Sound Tip
//find all sounds in game and play them all!
re('sound').method('play');


TODO
-sound channels

*/
re.sound = re.c('sound')
.global({
	
	enabled:true,
	volume:1
	
})
.inherit({
	volume:1
})
.define({

	play:function(loop){
		if(!this.sound || !re.sound.enabled) return this;
		
		var c = this.sound;
		
		c.currentTime = 0;
	
		c.play();
		
		if(loop){
			
			var l = 0;
			
			c.addEventListener('ended', function(){
				
				if(loop == -1 || l >= loop){
					c.currentTime = 0;
					l++;
				}
				
			}, false);
			
		}
		
		return this;
	},
	
	resume:function(){
		this.sound.play();
		return this;
	},
	
	pause:function(){
		this.sound.pause();
		
		return this;
	},
	
	currentTime:function(){
		return this.sound.currentTime;
	},
	
	ended:function(){
		return this.sound.ended;
	}
	
});