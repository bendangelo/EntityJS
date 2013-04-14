(function() {
  describe("rect", function() {
    var e;

    e = void 0;
    beforeEach(function() {
      return e = re.e("rect");
    });
    return it("draw", function() {
      return expect(e.draw(re.loop().context)).to.exist;
    });
  });

}).call(this);
