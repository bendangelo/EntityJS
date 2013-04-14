(function() {
  describe("defaults", function() {
    it("should default to zero", function() {
      var k;

      k = re.defaults(0, 10, 30);
      return expect(k).toEqual(0);
    });
    return it("should default to last", function() {
      var k;

      k = re.defaults(null, undefined, 100);
      return expect(k).toEqual(100);
    });
  });

}).call(this);
