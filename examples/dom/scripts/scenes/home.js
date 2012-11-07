re.scene('home')
.enter(function(){
  
  this.els = re.g('el').create();

  re.header(1, "Some Header")
  .alignLeft(10).alignTop(10);
  
  //some text..
  re.e('el:span contain')
  .text("RE_VER")
  .alignBottom(-10)
  .alignRight(-10);

  re.btn('Click Me', function(){
    alert('Clicked!');
  })
  .align(0,0)
  .tag('btn');

})
.exit(function(){
  //remove all els and els group
  this.els.dispose();
});