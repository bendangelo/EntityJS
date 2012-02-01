describe('load', function(){
    
    it('load', function(){
        //add images
        re.load.path = '__spec__/helpers/'
        var img = 'accept.png'
        var sfx = 'alligator.mp3'
        
        var called = false
        var prog = false
        
        re.load([img, sfx])
        .complete(function(){
          called = true
        })
        .progress(function(){
          prog = true
        })
        .error(function(){
          ok(false)
        })
        
        waits(300)
        runs(function(){
          ok(called)
          ok(prog)
          
          is(re.c(img).image)
          is(re.c(sfx).sound)
          is(re.c('accept.img').image)
          is(re.c('alligator.sfx').sound)
          
          var b = re.e('accept.png')
          is(b.image)
          eq(b.sizeX, b.image.width)
          eq(b.sizeY, b.image.height)
          eq(b.bisect, b.image.width)
          
          b = re.e('alligator.sfx')
          is(b.sound)
        })
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
        
        re.load('sdfsdf.png')
            .error(function(e){
            called = true
            })
            
        waits(200)
       runs(function(){
         ok(called)
        })
    });
    
});