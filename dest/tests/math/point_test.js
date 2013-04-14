(function() {
  describe("point", function() {
    var e;

    e = void 0;
    beforeEach(function() {
      return e = re.e("point");
    });
    it("should set pos with params", function() {
      expect(e.pos(10, 4)).to.exist;
      expect(e.posX).to.eql(10);
      return expect(e.posY).to.eql(4);
    });
    it("should set pos with object", function() {
      var obj;

      obj = {
        x: 10,
        y: 45
      };
      expect(e.pos(obj)).to.exist;
      expect(e.posX).to.eql(obj.x);
      expect(e.posY).to.eql(obj.y);
      obj = {
        posX: 13,
        posY: 25
      };
      expect(e.pos(obj)).to.exist;
      expect(e.posX).to.eql(obj.posX);
      return expect(e.posY).to.eql(obj.posY);
    });
    it("should be correct distance", function() {
      e.posX = 12;
      e.posY = 54;
      return expect(e.distance(23, 74) + 0.5 | 0).to.eql(23);
    });
    return it("should be correct distance with from", function() {
      var o;

      e.posX = 12;
      e.posY = 54;
      o = {
        x: 23,
        y: 74
      };
      expect(e.distance(o) + 0.5 | 0).to.eql(23);
      o = {
        posX: 23,
        posY: 74
      };
      return expect(e.distance(o) + 0.5 | 0).to.eql(23);
    });
  });

}).call(this);
