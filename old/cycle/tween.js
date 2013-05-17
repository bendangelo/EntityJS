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
		
    this.tween_time += t;
    
    var elapsed = this.tween_time / this.tween_t;
    
    if(elapsed > 1) elapsed = 1;
    
    //easing function
    value = this.tweenEase(elapsed);
    
    //advance
    for(var i in this.tween_d){
      
      //set deltas
      var ease = this.tween_s[i] + this.tween_d[i] * value;

      this.set(i, ease);
    }
    
    this.trigger('tween:update', value);
    
    if(elapsed == 1){
      
      this.tweening = false;
      
      this.off('update', this.tween_update);
      
      this.trigger('tween:finish');
    }
    
	}

})
.defaults({
	
	tweening:false,
  
  tweenEase:function(v){
    return v;
  }
	
})
.defines({
	
	tween:function(time, props){
    
    //accepts ms or seconds
    if(time >= 100){
      time /= 1000;
    }
    
    //TODO: fix this, probably move into system
    var maxTime = (time || 1) / re.loop().second;
    this.tween_time = 0;
    //steps are substracted until it reaches zero
    
    var deltas = {};
    var starts = {};
    for(var i in props){
      var value = this.get(i);
      
      deltas[i] = props[i] - value;
      starts[i] = value;
    }
    
    //tween initial values
    this.tween_s = starts;
    //tween deltas
    this.tween_d = deltas;
    //tween maximum time
    this.tween_t = maxTime;
    
    if(!this.tweening){
      this.on('update', this.tween_update);
    }
    
    this.tweening = true;
    
    return this.trigger('tween:start', starts);
	}
  
});

re.tween = function(obj, time, props){
  return obj.comp('tween').tween(time, props);
};