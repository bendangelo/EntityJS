re.c('btn')
.requires('el:button')
.factory(function(text, click){
	this.click(click).text(text);
})