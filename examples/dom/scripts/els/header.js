re.c('header')
.factory(function(type, text){
	this.comp('el:h'+type+' contain');
	this.$el.text(text);
});