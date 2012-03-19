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
		
    //advance
    for(var i in tween.d){
      this[i] += tween.d[i];
    }
    
    tween.t -= t;
    
    this.trigger('tween:update');
    
    if(tween.t <= 0){
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
    
    //steps are substracted until it reaches zero
		var steps = time / re.sys.stepSize;
    
    var deltas = {};
    for(var i in props){
      deltas[i] = (props[i] - this[i]) / (steps || 1);
    }
    
    this.tween_queue.push({t:steps, d:deltas});
    
    this.tweening = true;
    
    this.trigger('tween:start');
    
		return this;
	}
	
})
.init(function(){
	
  this.on('update', this.tween_update);
  this.tween_queue = [];
	
});

re.tween = function(obj, time, props){
  return obj.comp('tween').tween(time, props);
};