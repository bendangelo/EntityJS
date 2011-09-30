/*
The bitfont component writes text on the screen using a sprite image.
This is a faster approach than using the text component for now.
Plus you don't have to worry about the user not supporting the
wanted font.

*/

re.c('bitfont')
.require('point draw')
.inherit({

	text:'',
	//default width if charwidths not defined
	charOffset:32
	
})
.namespace({
	
	draw:function(context){
		
		if(this.text.length != 0 && this.image && (!this.screen || this.screen.touches(this.pos.x - this.reg.x, this.pos.y - this.reg.y, this.size.x, this.size. y))){
			
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
				
				context.drawImage(this.image, this.charCache[code], 0, charWidth, this.image.height, -this.reg.x + slot, -this.reg.y, charWidth, this.image.height);
				
				//append to next character slot
				slot += charWidth;
				
			}
			
			this.size.x = slot;
			this.size.y = this.image.height;
		}
		
	}
	
})
.define({
	
	updateSize:function(){
		
		var t = 0;
		//TODO size is slightly off 
		for(var p=0; p<this.text.length; p++){
			t += this.charWidths[p];
		}
		
		this.size.x = t;
		
		if(this.image){
			this.size.y = this.image.height;
		} else {
			this.size.y = 0;
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
	
	//calculate font widths
	this.size = {x:0, y:0};
	this.reg = {x:0, y:0};
	
	if(!this.charCache){
		this.charCache = {};
	}
	
	this.signal('draw', this.bitfont_draw);
	
})
.dispose(function(){
	
	this.signal('-draw', this.bitfont_draw);
	
});