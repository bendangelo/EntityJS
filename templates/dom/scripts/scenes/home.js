re.scene('home')
.enter(function(){
  
  re.header(1, "Some Header")
  .alignLeft(10).alignTop(10);
  
  //some text..
  re.e('el:span')
  .alignBottom(-10)
  .alignRight(-10)
  .$el.text("RE_VER");

})
.exit(function(){

  //built in to remove everything
  this.clear();
});