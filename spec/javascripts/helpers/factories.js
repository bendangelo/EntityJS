function f(type){
  switch(type){
    case 'comp':
    return re.c('asdf'+Math.random())
    case 'name':
    return 'sdfg'+Math.random();
    case 'image':
    return re.c('accept.png');
  }
  return null;
}