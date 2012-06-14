//Adds el to root container automatically
re.c('contain')
.init(function(){
	$(".RE_CANVAS-CONTAINER").append(this.el);
});