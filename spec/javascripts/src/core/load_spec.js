describe('load', function(){
    
    it('load', function(){
        //add images
        re.load.path = '__spec__/helpers/'
        var img = 'accept.png'
        var sfx = 'alligator.'+re.support('mp3', 'ogg')
        
        var called = false
        var prog = false
        
        re.load([img, sfx])
        .complete(function(assets){
          called = true
          is(assets, 'array')
          ok(prog)
          is(re.c(img).image)
          is(re.c(sfx).sound)
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
        .progress(function(name){
          prog = true
          is(name, 'string')
        })
        .error(function(){
          ok(false)
        })
        
        waits(500)
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