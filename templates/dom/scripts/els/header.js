re.c('header')
.factory(function(type, text){
	this.comp('el:h'+type);
	this.$el.text(text);
});