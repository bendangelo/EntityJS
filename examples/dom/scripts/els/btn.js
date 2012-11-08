re.c('btn')
.factory(function(text, click){
 	this.comp('el:button contain');
	this.click(click).text(text);
});
