re.distance = function(x1, y1, x2, y2) {  
  var kx, ky;
  kx = x2 - x1;
  ky = y2 - y1;
  
  return Math.sqrt(kx*kx + ky*ky);
};