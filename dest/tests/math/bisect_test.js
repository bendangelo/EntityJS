(function() {
  describe("bisect", function() {
    var e;

    e = void 0;
    beforeEach(function() {
      e = re.e("bisect");
      e.bisect = 160;
      e.sizeX = 60;
      return e.sizeY = 60;
    });
    it("static biToX", function() {
      return expect(re.bisect.toX(1, 160, 60)).to.eql(60);
    });
    it("static biToY", function() {
      return expect(re.bisect.toY(1, 160, 60, 60)).to.eql(0);
    });
    it("static biToTileX", function() {
      return expect(re.bisect.toTileX(1, 160, 60)).to.eql(1);
    });
    it("static biToTileY", function() {
      return expect(re.bisect.toTileY(1, 160, 60)).to.eql(0);
    });
    it("static tileToBi", function() {
      return expect(e.tileToBi(1, 0)).to.eql(1);
    });
    it("biToX", function() {
      return expect(e.biToX(1)).to.eql(60);
    });
    it("biToY", function() {
      return expect(e.biToY(1)).to.eql(0);
    });
    it("biToTileX", function() {
      return expect(e.biToTileX(1)).to.eql(1);
    });
    it("biToTileY", function() {
      return expect(e.biToTileY(1)).to.eql(0);
    });
    return it("tiletoBi", function() {
      return expect(e.tileToBi(1, 0)).to.eql(1);
    });
  });

}).call(this);
