(function() {
  describe("math/range", function() {
    return it("should return range", function() {
      var i;

      i = re.range(0, 2, 1);
      return expect(i).to.eql([0, 1]);
    });
  });

}).call(this);
