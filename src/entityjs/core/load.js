(function(re){
	
	var b = function(assets){
		return new re.load.init(assets);	
	}
	
	b.path = "";
	
	b.imageExt = 'img';
	b.soundExt = 'sfx';
	b.images = ['gif', 'jpg', 'jpeg', 'png'];
	b.sounds = ['wav', 'mp3', 'aac', 'ogg'];
	
	/*
	Loads images, sounds and other files into components.
	
	All loaded assets will be put into a component with a ref to the asset.
	
	//example of loading assets
	re.load('tiles.png add.js attack.mp3')
	.complete(function(arrayOfAssets){
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
	
	FUTURE remove directories from calls
	
	*/
	var l = function(assets){
		
		if(typeof assets == 'string'){
			this.assets = assets.split(' ');
		} else {
			this.assets = assets;
		}
		
		var a;
		for(var i=0; i<this.assets.length; i++){
			
			this.total++;
			
			a = this.assets[i];
			
			//find file extension
			var j = a.lastIndexOf('.')+1;
			var ext = a.substr(j).toLowerCase();
			
			//remove directories
			var d = a.lastIndexOf('/');
			if(d != -1){
				a = a.substr(d+1, a.length);
			}
			
			//find name
			var n = a.substr(0, j);
			
			if(re.load.images.indexOf(ext) != -1){

				this._loadImg(a, n);
				
			} else if(re.load.sounds.indexOf(ext) != -1){
				
				//check if support component exists first
				if(!re.support || re.support(ext)){
					this._loadSound(a, n);
				}
				
			}
			
			
		}
		
		return this;
	}
	
	var p = l.prototype;
	
	p.current = 0;
	p.total = 0;
	
	p._loadImg = function(a, n){
	
		var that = this;
		var img = new Image();
		
		//create new image component
		re.c(a)
		.alias(n+re.load.imgExt)
		.global({
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
		};
		
		img.onerror = function(){
			
			if(that._e){
				that._e.call(that, a);
			}
			
		};
		
		img.src = re.load.path+a
		
		return this;
	}
	
	p._loadSound = function(a, n){
		var that = this;
		
		var s = new Audio(re.load.path+a);
		s.preload = "auto";
		s.load();
		
		re.c(a)
		//create global codec for easy use
		.alias(n+re.load.soundExt)
		.global({
			sound:s
		})
		.define({
			sound:s
		});
		
		s.addEventListener('canplaythrough',function(){
			that.current++;
			
			if(that._p){
				that._p.call(that, that.current, that.total, a);
			}
			
			if(that.current >= that.total){
				if(that._s){
					that._s.call(that, that.assets);
				}
				
			}
			
		},false);
		
		s.addEventListener('error',function(){
			
			if(that._e){
				that._e.call(that, a);
			}
		},false);
		
	}
	
	p.progress = function(m){
		
		this._p = m;
		
		return this;
	}
	
	p.complete = function(m){
		
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