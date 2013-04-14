(function() {
  describe("core/base", function() {
    var c;

    c = void 0;
    beforeEach(function() {
      return c = new re.base();
    });
    return it("should tag class", function() {
      c.tag("bob");
      return expect(re("#bob").tag()).toEqual(c.tag());
    });
  });

}).call(this);
