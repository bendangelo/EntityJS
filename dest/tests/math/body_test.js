(function() {
  describe("body", function() {
    var e;

    e = void 0;
    beforeEach(function() {
      return e = re.e("body");
    });
    it("hit", function() {
      var o;

      e.bodyX = 40;
      e.bodyY = 40;
      expect(e.hit(41, 0, 40, 40)).to.not.be.ok();
      o = {
        posY: 0,
        posX: 0,
        sizeX: 40,
        sizeY: 30
      };
      return expect(e.hit(o)).to.be.ok();
    });
    return it("hitBody", function() {
      var o;

      e.bodyX = 40;
      e.bodyY = 40;
      expect(e.hitBody(41, 0, 40, 40, 0, 0)).to.not.be.ok();
      o = {
        posY: 0,
        posX: 0,
        bodyX: 40,
        bodyY: 30,
        padX: 0,
        padY: 0
      };
      return expect(e.hitBody(o)).to.be.ok();
    });
  });

}).call(this);
