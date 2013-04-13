describe('load', function(){
    
    it('load', function(){
        //add images
        re.load.path = '__spec__/'
        var img = '/__spec__/helpers/accept.png'
        var sfx = 'http://localhost:8888/__spec__/helpers/alligator.mp3'
        var sfx2 = 'helpers/alligator.ogg'
        
        var called = false
        var prog = false
        
        re.load([img, sfx, sfx2])
        .complete(function(assets){
          called = true
          is(assets, 'array')
          ok(prog)
          is(re.c('accept.png').image)
          
          is(re.c('accept.img').image)
          is(re.c('alligator.sfx').sound)
          
          var b = re.e('accept.png')
          is(b._image)
            eq(b.sizeX, b._image.width)
            eq(b.sizeY, b._image.height)
            eq(b.bisect, b._image.width)
          
          b = re.e('alligator.sfx')
          is(b._sound)
        })
        .progress(function(current, total, name){
          prog = true
          is(name, 'string')
          is(current, 'number')
          is(total, 'number')
        })
        .error(function(){
          ok(false)
        })
        
        waits(1000)
        runs(function(){
          ok(called)
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