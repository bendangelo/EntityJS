describe('core/class', function(){
    var c;

    beforeEach(function(){
        c = new re.class();
    });

    it('should tag class', function(){
        c.tag("bob");

        expect(re("#bob").tag()).toEqual(c.tag());
    });

});