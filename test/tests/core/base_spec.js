describe('core/base', function(){
    var c;

    beforeEach(function(){
        c = new re.base();
    });

    it('should tag class', function(){
        c.tag("bob");

        expect(re("#bob").tag()).toEqual(c.tag());
    });

});