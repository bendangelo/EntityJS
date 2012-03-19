/*
The tween component tweens properties of entities to the given value over a period of time.

This is useful for animations.

re.e('tween')
.tween(800, {x:10})
.wait(500)

EVENTS:
tween:start
tween:finish
tween:update

*/
re.c('tween')
.requires('update')
.namespaces({

	update:function(t){
		if(!this.tweening) return;
		
    var tween = this.tween_queue[0];
		
    this.tween_time += t;
    
    var elapsed = this.tween_time / this.tween_maxTime;
    
    if(elapsed > 1) elapsed = 1;
    
    //easing function
    value = this.tweenEase(elapsed);
    
    //advance
    for(var i in tween.d){
      //TODO: support setter methods
      
      //set deltas
      var ease = tween.s[i] + tween.d[i] * value;
      if(re.is(this[i], 'function')){
        this[i](ease);
      } else {
        this[i] = ease;
      }
    }
    
    this.trigger('tween:update');
    
    if(elapsed == 1){
      
      //remove from queue
      this.tween_queue.shift();
      
      this.tweening = !!this.tween_queue.length;
      
      this.trigger('tween:finish');
    }
    
	}

})
.defaults({
	
	tweening:false
	
})
.defines({
	
	tween:function(time, props){
    //accepts ms or seconds
    if(time >= 30){
      time /= 1000;
    }
    
    this.tween_maxTime = (time || 1)/ (re.sys.stepSize * 60);
    this.tween_time = 0;
    //steps are substracted until it reaches zero
    
    var deltas = {};
    var starts = {};
    for(var i in props){
      var value = this[i];
      if(re.is(value, 'function')) value = value();
      
      //TODO: support get functions
      deltas[i] = props[i] - value;
      starts[i] = value;
    }
    
    this.tween_queue.push({s:starts, d:deltas});
    
    this.tweening = true;
    
    return this.trigger('tween:start');
	},
  
  tweenEase:function(v){
    return v;
  }
	
})
.init(function(){
	
  this.on('update', this.tween_update);
  this.tween_queue = [];
	
});

re.tween = function(obj, time, props){
  return obj.comp('tween').tween(time, props);
};