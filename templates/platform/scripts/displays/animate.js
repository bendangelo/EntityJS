re.c('animate')
.requires('flicker')
.defines({
  
  animate:function(name){
    var a = this.anis[name].slice();
    a.push(name);
    return this.flicker.apply(this, a);
  }
  
});