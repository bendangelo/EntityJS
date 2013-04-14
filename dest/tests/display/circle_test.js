(function() {
  describe("circle", function() {
    var e;

    e = void 0;
    beforeEach(function() {
      return e = re.e("circle");
    });
    it("should create circle", function() {
      return expect(e).to.exist;
    });
    it("should draw", function() {
      return expect(e.draw(re.loop().context)).to.exist;
    });
    return it("should radius", function() {
      expect(e.radius(10), "object").to.exist;
      expect(e.radius()).to.eql(10);
      expect(e.set("radius", 14)).to.exist;
      return expect(e.radius()).to.eql(14);
    });
  });

}).call(this);
