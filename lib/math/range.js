/*
Returns an array of integers within the given range.

re.range(0, 2); //[0, 1]
re.range(2, 10, 2); //[2, 4, 6, 8]

*/
re.range = function(start, finish, step){
  var a = [];
  for(var i=start||0; i<finish; i+=step||1){
    a.push(i);
  }
  return a;
};