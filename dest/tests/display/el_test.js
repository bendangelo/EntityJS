(function() {
  describe("displays/el", function() {
    var e;

    e = void 0;
    beforeEach(function() {
      return e = re.e("el");
    });
    return it("should define valid dom", function() {
      expect(e.el, "htmldivelement").to.exist;
      expect(e.posX()).to.eql(0);
      expect(e.posY()).to.eql(0);
      expect(e.sizeX()).to.eql(0);
      return expect(e.sizeY()).to.eql(0);
    });
  });

}).call(this);
