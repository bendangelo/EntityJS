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

Its reccomended to save the supported codec somewhere staticsy
//like so...
re.codec = re.support('ogg', 'aac');

re.load('run.'+re.codec);

re.e('run.'+re.codec);

WARNING: Because the sound component has generic
method names stop, play, watchout for overwrites.

Sound Tip
//find all sounds in game and play them all!
re('sound').method('play');


*/
re.sound = re.c('sound')
.statics({
	
	enabled:true
	
})
.namespaces({
	
	hasEvent:false,
	loops:0
	
})
.defines({

	play:function(loop){
		if(!this.sound || !re.sound.enabled) return this;
		
		var c = this.sound;
		var that = this;
		
		c.currentTime = 0;
	
		c.play();
		
		if(loop){
			
			this.sound_loops = 0;
			
			if(!this.sound_hasEvent){
				this.sound_hasEvent = true;
				
				c.addEventListener('ended', function(){
					
					that.bind('sounded', that.sound_loops, loop);
					
					if(loop == -1 || that.sound_loops < loop){
						c.currentTime = 0;
						that.sound_loops++;
					}
					
				}, false);
			}
			
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