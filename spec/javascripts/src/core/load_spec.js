describe('load', function(){
    
    it('load', function(){
        //add images
    });
    
    it('should call complete on empty load', function(){
        var called = false
       re.load([])
           .complete(function(){
           called = true
           });
       ok(called)
    });
    
    it('should throw error on not found image', function(){
        var called = false
       runs(function(){
        re.load('sdfsdf.png')
            .error(function(e){
            called = true
            })
        })
        waits(200)
       runs(function(){
         ok(called)
        })
    });
    
});