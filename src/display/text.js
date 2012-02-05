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
	textAlign:'',
	font_text:''
})
.defines({
	
	visible:function(){
		return this.font_text && this.parent('draw', 'visible')
	},
	
	text:function(t){
    if(re.is(t)){
  		this.font_text = t;
      return this;
    }
		return this.font_text;
	},
	
	draw:function(c){
		
		c.font = this.font;
		c.fillStyle = this.textColor;
		c.fillText(this.font_text, -this.regX, -this.regY);
		return this;
	}
	
});