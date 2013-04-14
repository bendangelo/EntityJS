(function() {
  describe("sprite", function() {
    var e;

    e = void 0;
    beforeEach(function() {
      e = re.e("sprite " + f("image").name);
      e.bisect = 16;
      e.sizeX = 2;
      return e.sizeY = 2;
    });
    it("frame", function() {
      expect(e.frame()).to.eql(0);
      expect(e.frame(1)).to.eql(e);
      expect(e.frameX).to.eql(1);
      expect(e.frameY).to.eql(0);
      return expect(e.frame()).to.eql(1);
    });
    it("should display second row", function() {
      e.bisect = 2001;
      e.sizeY = 80;
      e.sizeX = 87;
      e.frame(22);
      expect(e.frameX).to.eql(22);
      expect(e.frameY).to.eql(0);
      e.frame(23);
      expect(e.frameX).to.eql(0);
      return expect(e.frameY).to.eql(1);
    });
    return it("draw", function() {
      return expect(e.draw(re.loop().context)).to.exist;
    });
  });

}).call(this);
