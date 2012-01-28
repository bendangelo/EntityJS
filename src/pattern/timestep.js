/*


re.e('timestep')
.timestep(progress, function(){
    
    
    
});
*/

re.c('timestep')
.defaults({
    
    stepProgress:0,
    stepSize:0.3
    
})
.defines({
    
    timestep:function(progress, callback, context){
        
        this.stepProgress += progress;
        
        while(this.stepProgress >= this.stepSize){
            
            callback.call((context)?context:this);
            
            this.stepProgress -= this.stepSize;
        }
        
    }
    
})