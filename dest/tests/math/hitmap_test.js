(function() {
  describe("hitmap", function() {
    var e;

    e = void 0;
    beforeEach(function() {
      return e = re.e("hitmap");
    });
    it("checkHit", function() {
      var k;

      k = e.checkHit(0, 0, 10, 10, 10, 10, 0, 0);
      expect(k).to.exist;
      expect(k.posX).to.eql(10);
      return expect(k.posY).to.eql(10);
    });
    it("should hit wall", function() {
      var bodX, bodY, posX, posY, res, velX, velY;

      re.tile.sizeX = 25;
      re.tile.sizeY = 25;
      posX = 0;
      posY = 0;
      velX = 40;
      velY = 0;
      bodX = 25;
      bodY = 25;
      e.automap(1, 0, e.hitValue);
      res = e.checkHit(posX, posY, velX, velY, bodX, bodY, 0, 0);
      expect(res.hitX).to.be.ok();
      expect(res.tarX).to.exist;
      return expect(res.tarY).to.exist;
    });
    return it("has automap", function() {
      return e.automap(0, 0, 1);
    });
  });

}).call(this);
