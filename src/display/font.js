/*
The font component displays font on screen using the canvas font api.

//create font
re.e('font')
.defines({
	text:'Texting Message',
	textColor:'#ff0000'
});

TODO implement size

*/
re.c('font')
.requires('draw')
.defaults({
	font:"14px sans-serif",
	textColor:'#000000',
	textAlign:'',
	text:''
})
.defines({
	
	isVisible:function(){
		return this.text.length != 0 && this.parent('draw', 'isVisible')
	},
	
	setText:function(t){
		this.text = t;
		return this;
	},
	
	draw:function(c){
		
		c.font = this.font;
		c.fillStyle = this.textColor;
		c.fillText(this.text, -this.regX, -this.regY);
		
	}
	
});