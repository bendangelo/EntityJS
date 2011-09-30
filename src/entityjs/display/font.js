/*
The font component displays font on screen using the canvas font api.

//create font
re.e('font')
.define({
	text:'Texting Message',
	textColor:'#ff0000'
});

*/
re.c('font')
.require('draw point')
.inherit({
	font:"14px sans-serif",
	textColor:'#000000',
	textAlign:'',
	text:''
})
.namespace({
	
	draw:function(context){
		
		//TODO implement screen
		if(this.text.length != 0){
			
			context.font = this.font;
			context.fillStyle = this.textColor;
			context.fillText(this.text, -this.reg.x, -this.reg.y);
			
		}
		
	}
	
})
.init(function(){
	this.signal('draw', this.font_draw);
});