/*
The PreventDefault method prevents defaults for input events.
*/
re.preventDefault = function(pres){
  if(re.is(pres, 'string')) pres = pres.split(' ');
  
  for(var i in pres){
    re.preventDefault.d[pres[i]] = 1;
  }
};
re.preventDefault.d = {};