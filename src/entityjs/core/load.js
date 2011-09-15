(function(re){
	
	var b = function(assets){
		return new re.load.init(assets);	
	}
	
	b.path = "";
	
	b.maxChannels = 3;
	b.supportedImages = ['gif', 'jpg', 'jpeg', 'png'];
	b.supportedSounds = ['wav', 'mp3', 'aac', 'ogg', 'm4a'];
	
	/*
	Loads images, sounds and other files into components.
	
	All loaded assets will be put into a component with a ref to the asset.
	
	//example of loading assets
	re.load('tiles.png add.js attack.mp3')
	.success(function(arrayOfAssets){
		//create new bitmap of tiles.png
		re.e('bitmap tiles.png');
		
		//new sound
		re.e('sound attack.mp3');
		
		//access image staticaly or localy
		re.comp('tiles.png').image;
		re.entity('tiles.png').image;
		
	})
	.error(function(assetThatCausedError){
		//error
	})
	.progress(function(current, total, assetLoaded){
		//called on loads
	});
	
	@warning only supports loading images and sounds
	
	//load sound
	
	//re.support will return the supported codec
	re.load('run.'+re.support('ogg', 'aac'));
	
	*/
	var l = function(assets){
		
		if(typeof assets == 'string'){
			this.assets = assets.split(' ');
		}
		
		var a;
		for(var i in this.assets){
			this.total++;
			a = this.assets[i];
			
			//find file extension
			var ext = a.substr(a.lastIndexOf('.')+1).toLowerCase();
			
			if(re.load.supportedImages.indexOf(ext) != -1){
				this._loadImg(a);
				
			} else if(re.support(ext) && re.load.supportedSounds.indexOf(ext) != -1){
				this._loadSound(a);
				
			}
			
			
		}
		
		return this;
	}
	
	var p = l.prototype;
	
	p.current = 0;
	p.total = 0;
	
	p._loadImg = function(a){
	
		var that = this;
		var img = new Image();
		
		//create new image component
		re.c(a)
		.static({
			image:img
		})
		.define({
			//save image for other components to copy or use
			image:img
		});
		
		img.onload = function(){
			that.current++;
			
			if(that._p){
				that._p.call(that, that.current, that.total, a);
			}
			
			if(that.current >= that.total){
			
				if(that._s){
					that._s.call(that, that.assets);
				}
				
			}
		}
		
		img.onerror = function(){
		
			if(that._e){
				that._e.call(that, a);
			}
			
		}
		
		img.src = re.load.path+a
		
		return this;
	}
	
	p._loadSound = function(a){
		var that = this;
		
		var channels = [];
		
		var a = new Audio(re.load.path+a);
		a.load();
		
		//cloning glitch fix
		document.body.appendChild(a);
		
		a.addEventListener('canplaythrough', function(e){
			
			//multiple channels will allow the sound to be played more at the sametime.
			//this will load the sound multiple times sadly FIX
			for(var i=0; i<re.load.maxChannels-1; i++){
				channels.push(a.cloneNode(true));
			}
			
			//TODO refactor
			that.current++;
			
			if(that._p){
				that._p.call(that, that.current, that.total, a);
			}
			
			if(that.current >= that.total){
			
				if(that._s){
					that._s.call(that, that.assets);
				}
				
			}
			
		}, false);
		
		re.c(a)
		.static(function(){
			channels:channels
		})
		.define({
			channels:channels
		});
		
		
		
		//TODO assets progress and on error
		
	}
	
	p.progress = function(m){
		
		this._p = m;
		
		return this;
	}
	
	p.success = function(m){
		
		this._s = m;
		
		return this;
	}
	
	p.error = function(m){
		
		this._e = m;
		
		return this;
	}
	
	re.load = b;
	re.load.init = l;
	
}(re));