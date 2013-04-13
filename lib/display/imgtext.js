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
.defaults({
  //remove empty characters in ascii
	charOffset:32,
	lineHeight:15
})
.defines({
	
	visible:function(){
		return this._text && this._image && this._super('draw', 'visible');
	},
	
	draw:function(c){
	  
    for(var i=0; i<this.text_lines.length; i++){
      this.drawText(c, this.text_lines[i], i * this.lineHeight);
    }
		
	  return this;
	},
	
  drawText:function(c, text, yPos){
    
		var slot = 0, charWidth, code, charPos;
		
		for(var i=0, l = text.length; i<l; ++i){
			
			//get char code
			code = text.charCodeAt(i) - this.charOffset;
			
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
			
			c.drawImage(this._image, this.charCache[code], 0, charWidth, this._image.height, -this.regX + slot, -this.regY + yPos, charWidth, this._image.height);
			
			//append to next character slot
			slot += charWidth;
			
		}
  },
  
	text:function(t){
		if(re.is(t)){
  		this._text = t;
      
      this.text_lines = this._text.split('\n');
      
  		this.sizeX = 0;
  		
      //find the longest line and set that as the width
      for(var i in this.text_lines){
    		var w = 0;
    		//TODO size is slightly off 
    		for(var p=0; p<this.text_lines[i].length; p++){
    			w += this.imgtext[p];
    		}
        if(w > this.sizeX){
          this.sizeX = w;
        }
      }
  		
      this.sizeY = this.text_lines.length * this.lineHeight;
      
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