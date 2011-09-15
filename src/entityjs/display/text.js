/*
The text component displays text on screen using the canvas text api.

//create text
re.e('text')
.define({
text:'Texting Message',
textColor:'#ff0000'
});

*/
re.c('text')
.require('draw point')
.define({
	font:"14px sans-serif",
	textColor:'#000000',
	textAlign:'',
	text:'',
	
	draw:function(context){
		if(this.text != ''){
			context.font = this.font;
			context.fillStyle = this.textColor;
			context.fillText(this.text, this.pos.x, this.pos.y);
		}
	}
	
})
.init(function(){
	this.signal('draw', this.draw);
})
.dispose(function(){
	this.signal('-draw', this.draw);
});