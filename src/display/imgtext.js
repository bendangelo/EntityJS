/*
The imgfont component writes text on the screen using a sprite image.
This is a faster approach than using the text component for now.
Plus you don't have to worry about the font not being supported.

@usage
//Must be created as a component to implement the imgtext array.
//imgtext is an array of all characters and defines the width
//of each.

re.c('serif')
.requires('imgtext font serif.png')
.defines('imgtext', [4,4,2,4,3,5,6,7,8,3,4,5])

re.e('serif')
.text('This displays on screen')

//find all fonts
re('font')

*could be turned in to a special sprite component but wouldn't
be very useful.
*/

re.c('imgtext')
.requires('draw')
.interfaces('imgtext')
.defaults({
  //remove empty characters in ascii
	charOffset:32
	
})
.defines({
	
	visible:function(){
		return this._text && this._image && this.parent('draw', 'visible');
	},
	
	draw:function(c){
	
		var slot = 0, charWidth, code, charPos;
		
		for(var i=0, l = this._text.length; i<l; ++i){
			
			//get char code
			code = this._text.charCodeAt(i) - this.charOffset;
			
			//find width of character
			charWidth = this.imgtext[code];
			
			//find source character position
			if(!this.charCache[code]){
				charPos = 0;
				for(var p=0; p<code; ++p){
					charPos += this.imgtext[p]+1;
				}
				this.charCache[code] = charPos;
			}
			
			c.drawImage(this._image, this.charCache[code], 0, charWidth, this._image.height, -this.regX + slot, -this.regY, charWidth, this._image.height);
			
			//append to next character slot
			slot += charWidth;
			
		}
		
		this.sizeX = slot;
		this.sizeY = this._image.height;
	  return this;
	},
	
	text:function(t){
		if(re.is(t)){
  		this._text = t;
      
  		var t = 0;
  		//TODO size is slightly off 
  		for(var p=0; p<this._text.length; p++){
  			t += this.imgtext[p];
  		}
  		
  		this.sizeX = t;
  		
  		if(this._image){
  			this.sizeY = this._image.height;
  		} else {
  			this.sizeY = 0;
  		}
      
      return this;
    }
		return this._text;
	}
	
})
.init(function(){
	
	if(!this.charCache){
		this.charCache = {};
	}
	this.text('');
});