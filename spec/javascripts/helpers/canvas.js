function setup_canvas(){
  
  $('body').append('<canvas id="game-canvas" width="500" height="400"></canvas>')
}

function teardown_canvas(){
  $('#game-canvas').remove()
}

$(function(){
  //disable soundmanager
  soundManager = null;
  
        setup_canvas();
        
    re.loop().init('#game-canvas');
    
});