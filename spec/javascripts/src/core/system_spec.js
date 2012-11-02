describe('system', function(){
    
    var s;

    re.s("render")
    .defines({

        process:function(e){
            e = 99;
        }

    });

    it('should process all entities', function(){

        s = re.s("render").create([10, 2]);

        s.processEntites();

        expect(s.entities[0]).toEqual(99);
        expect(s.entities[1]).toEqual(99);
    });
    
});