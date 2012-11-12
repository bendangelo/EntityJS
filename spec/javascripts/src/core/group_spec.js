describe('group', function(){
    
    var s;

    re.g("base")
    .defines({
        blah:99
    });

    re.g("monsters")
    .requires('base')
    .defines({

        findAt:function(x, y){
            return this.find(function(e){
                return e.x == x && e.y == y;
            });
        }

    });

    it('should create new group', function(){
        var val = 10;

        re.g("monsters").create([val]);

        ok(re('monsters').first(), val);

        var mon = re.e('monsters').attr({x:10, y:3});

        expect(re('monsters').findAt(10, 3).x).toEqual(mon.x);

        //has props
        expect(re('monsters').get("blah")).toEqual(99);
    });
    
});