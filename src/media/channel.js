/*
The channel component allows you to play a sound component more than
once at the sametime. This is useful for shooting or fast games.

//create a new channel
re.e('channel attack.sfx')
.play()
.play()
.play();

//extension sfx is created for every 
//sound loaded regards of type

//TODO

//add more channels

        //cloning glitch fix
        document.body.appendChild(s);
        
        s.addEventListener('canplaythrough', function(e){
            
            //multiple channels will allow the sound to be played more at the sametime.
            //this will load the sound multiple times sadly FIX
            for(var i=0; i<re.load.maxChannels-1; i++){
                channels.push(s.cloneNode(true));
            }
            
            if(that._p){
                that._p.call(that, that.current, that.total, a);
            }
            
            if(that.current >= that.total){
                
                if(that._s){
                    that._s.call(that, that.assets);
                }
                
            }
            
        }, false);
*//*
re.channel = re.c('channel')
.requires('sound')
.defaults({
    volume:1,
    max:3
})
.defines({

    play:function(loop){
        if(!this.channels || !re.sound.enabled) return this;
        
        var c;
        for(var i=0; i<this.channels.length; i++){
            
            c = this.channels[i];
            if(c.ended || !c.currentTime){
                //play new channel
                c.play();
                break;
            } else if(i == this.channels[i].length-1){
                c.currentTime = 0;
                c.play();
            }
            
        }
        
        if(loop){
            
            var l = 0;
            
            c.addEventListener('ended', function(){
                
                if(loop == -1 || l >= loop){
                    this.currentTime = 0;
                    l++;
                }
                
            }, false);
            
        }
        
        return this;
    },
    
    stop:function(){
        
        //stop all channels
        
    }
    
});*/