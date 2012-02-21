function setup_canvas(){
  
  $('body').append('<canvas id="game-canvas" width="500" height="400"></canvas>')
  if(window['FlashCanvas'] != null){
    FlashCanvas.initElement($('#game-canvas'));
  }
}

function teardown_canvas(){
  $('#game-canvas').remove()
}

$(function(){
        setup_canvas();
        
    re.sys.init('#game-canvas');
    
});