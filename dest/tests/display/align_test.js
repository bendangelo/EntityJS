(function() {
  describe("align", function() {
    var e;

    e = void 0;
    beforeEach(function() {
      return e = re.e("align circle");
    });
    it("align hor", function() {
      expect(e.alignHor(10)).to.exist;
      return expect(e.posX).to.eql(re.loop().sizeX * 0.5 - e.sizeX * 0.5 + 10 | 0);
    });
    it("align ver", function() {
      expect(e.alignVer(1)).to.exist;
      return expect(e.posY).to.eql(re.loop().sizeY * 0.5 - e.sizeY * 0.5 + 1 | 0);
    });
    it("align right", function() {
      expect(e.alignRight(5)).to.exist;
      return expect(e.posX).to.eql(re.loop().sizeX - e.sizeX + 5);
    });
    it("align left", function() {
      expect(e.alignLeft(5)).to.exist;
      return expect(e.posX).to.eql(5);
    });
    it("align top", function() {
      expect(e.alignTop(5)).to.exist;
      return expect(e.posY).to.eql(5);
    });
    return it("align bottom", function() {
      expect(e.alignBottom(5)).to.exist;
      return expect(e.posY).to.eql(re.loop().sizeY - e.sizeY + 5);
    });
  });

}).call(this);
