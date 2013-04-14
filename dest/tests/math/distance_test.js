(function() {
  describe("distance", function() {
    return it("distance", function() {
      return expect(re.distance(10, 10, 20, 40) | 0).to.eql(31);
    });
  });

}).call(this);
