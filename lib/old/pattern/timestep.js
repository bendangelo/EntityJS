/*
The timestep component gathers steps over time and once the maximum steps
are achieved it will dispatch the callback method. This method is also delta time
safe, so you don't need to worry about alternate values over time.

  
*/

re.c('timestep')
.defaults({
    
    stepProgress:0,
    stepSize:100
    
})
.defines({
    
    timestep:function(progress, callback, context){
        
        this.stepProgress += progress;
        
        while(this.stepProgress >= this.stepSize){
            
            callback.call(context || this);
            
            this.stepProgress -= this.stepSize;
            
            //break if stepSize is zero
            if(!this.stepSize) break;
        }
        
    }
    
})