/*
The bitfont component writes text on the screen using a sprite image.
This is a faster approach than using the text component for now.
Plus you don't have to worry about the user not supporting the
wanted font.

*/

re.c('bitfont')
.require('draw')
.inherit({
	
	text:'',
	//default width if charwidths not extendd
	charOffset:32
	
})
.extend({
	
	isVisible:function(){
		return this.text.length != 0 && this.bitmap && this.parent('draw', 'isVisible');
	},
	
	draw:function(c){
	
		var slot = 0, charWidth, code, charPos;
		
		for(var i=0, l = this.text.length; i<l; ++i){
			
			//get char code
			code = this.text.charCodeAt(i) - this.charOffset;
			
			//find width of character
			charWidth = this.charWidths[code];
			
			//find source character position
			if(!this.charCache[code]){
				charPos = 0;
				for(var p=0; p<code; ++p){
					charPos += this.charWidths[p]+1;
				}
				this.charCache[code] = charPos;
			}
			
			c.drawImage(this.bitmap, this.charCache[code], 0, charWidth, this.bitmap.height, -this.regX + slot, -this.regY, charWidth, this.bitmap.height);
			
			//append to next character slot
			slot += charWidth;
			
		}
		
		this.sizeX = slot;
		this.sizeY = this.bitmap.height;
	
	
	},
	
	updateSize:function(){
		
		var t = 0;
		//TODO size is slightly off 
		for(var p=0; p<this.text.length; p++){
			t += this.charWidths[p];
		}
		
		this.sizeX = t;
		
		if(this.bitmap){
			this.sizeY = this.bitmap.height;
		} else {
			this.sizeY = 0;
		}
		return this;
	},
	
	setText:function(text){
		
		this.text = text;
		this.updateSize();
		
		return this;
	}
	
})
.init(function(){
	
	if(!this.charCache){
		this.charCache = {};
	}
	
	this.updateSize();
	
});