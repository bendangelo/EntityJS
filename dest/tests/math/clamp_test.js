(function() {
  describe("clamp", function() {
    var e;

    e = void 0;
    beforeEach(function() {
      return e = re.e("clamp");
    });
    it("should clamp by range", function() {
      e.posX = 999;
      expect(e.clamp("posX", 0, 100)).to.exist;
      return expect(e.posX).to.eql(100);
    });
    it("should clamp by range, global method", function() {
      e.posX = 999;
      e.posX = re.clamp(e.posX, 0, 100);
      return expect(e.posX).to.eql(100);
    });
    return it("should clamp by minimum", function() {
      e.posX = 999;
      expect(e.clamp("posX", 0)).to.exist;
      expect(e.posX).to.eql(999);
      e.posX = -1;
      expect(e.clamp("posX", 0)).to.exist;
      return expect(e.posX).to.eql(0);
    });
  });

}).call(this);
