/*
The text component displays font on screen using the canvas font api.

//create font
re.e('text')
.defines({
	text:'Texting Message',
	textColor:'#ff0000'
});

TODO implement size

*/
re.c('text')
.requires('draw')
.defaults({
	font:"14px sans-serif",
	textColor:'#000000',
	textAlign:'left',
  textBaseline:'top',
	font_text:''
})
.defines({
	
	visible:function(){
		return this._text && this.parent('draw', 'visible');
	},
	
	text:function(t){
    if(re.is(t)){
  		this._text = t;
      return this;
    }
		return this._text;
	},
	
	draw:function(c){
		
		c.font = this.font;
		c.fillStyle = this.textColor;
    c.textAlign = this.textAlgin;
    c.textBaseline = this.textBaseline;
		c.fillText(this._text, -this.regX, -this.regY);
    
		return this;
	}
	
});