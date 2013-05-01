/*
The sound component utilizes the new HTML5 to play sound effects in the web browser.
It is reccommended to load two sound codecs OGG and AAC because not every browser supports
all sound codecs at this time.

//load a sound
re.load('run.ogg run.aac');
//BAD this will load both sounds. Even if the browser doesn't support one

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

Its recomended to save the supported codec somewhere
//like so...
re.codec = re.support('ogg', 'aac');

re.load('run.'+re.codec);

re.e('run.'+re.codec);

WARNING: Because the sound component has generic
method names stop, play, watchout for overwrites.

Sound Tip
//find all sounds in game and play them!
re('sound').method('play');

*note: A sound only only has one channel and cannot be played multiple times at once.
This will be fixed with the channel component.

*/
re.c('sound')
.statics({
    
    enabled:true,
    volume:1
    
})
.defaults({
  playing:false
})
.namespaces({
  e:0,
  
  ended:function(){
    this.playing = 0;
    this.trigger('sound:finish');
    
  }
  
})
.defines({

    /*
    Plays the sound from the beginning.

    onFinish is called when the sound has finished playing through all loops.
    */
    play:function(loops, volume, onFinish){
        if(!this._sound || !re.sound.enabled) return this;
        if(this.playing) this.stop();
        
        var c = this._sound;
        var that = this;
        volume = volume || re.sound.volume;
        
        if(window.soundManager){
          //play sound with soundManager
          c.play({
            onfinish:function(){
              that.sound_ended();
              if(onFinish) onFinish(that);
            },
            position:0,
            volume:volume,
            loops:loops||1
          });
          
        } else {
          //play with browser
          c.currentTime = 0;
          c.volume = volume;
          loops = loops||1;
          
          var f = function(){
            if(--loops>0){
              c.play();
            } else {
              c.removeEventListener('ended', f);
              that.sound_ended();
              if(onFinish) onFinish(that);
            }
          };

          c.addEventListener('ended', f);

          c.play();
        }
        this.playing = 1;
      
        return this;
    },
    
    //stops playing the sound
    stop:function(){
        this._sound.pause();
        this.playing = 0;
        
        return this;
    }
    
});