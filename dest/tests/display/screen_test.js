(function() {
  describe("screen", function() {
    var e;

    e = void 0;
    beforeEach(function() {
      return e = re.e("screen");
    });
    it("pos", function() {
      expect(e.pos()).to.eql(e);
      expect(e.pos(10, 4)).to.eql(e);
      expect(e.posX).to.eql(10);
      expect(e.posY).to.eql(4);
      expect(e.pos({
        posX: 2,
        posY: 3
      })).to.eql(e);
      expect(e.posX).to.eql(2);
      return expect(e.posY).to.eql(3);
    });
    it("toScreenx", function() {
      return expect(e.toScreenX(10)).to.exist;
    });
    return it("toScreenY", function() {
      return expect(e.toScreenY(10)).to.exist;
    });
  });

}).call(this);
