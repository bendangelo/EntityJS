describe('system', function(){
    
    var s;

    re.s("base")
    .defines({
        blah:99
    });

    re.s("render")
    .requires('base')
    .defines({

        process:function(e){
            e.ok = 10;
        }

    });

    it('should process all entities', function(){

        s = re.s("render").create([{}, {}]);

        s.processAll();

        expect(s.entities[0].ok).toEqual(10);
        expect(s.entities[1].ok).toEqual(10);

        //has class methods
        expect(s.get("blah")).toEqual(99);
    });
    
});