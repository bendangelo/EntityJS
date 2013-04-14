(function() {
  describe("tile", function() {
    var e;

    e = void 0;
    beforeEach(function() {
      re.tile.sizeX = 40;
      re.tile.sizeY = 40;
      return e = re.e("tile");
    });
    it("toPos", function() {
      e = re.tile.toPos(88, 40);
      expect(e.posX).to.eql(80);
      return expect(e.posY).to.eql(40);
    });
    it("toPosX", function() {
      expect(re.tile.toPosX(88, 40)).to.eql(80);
      re.tile.sizeX = 40;
      return expect(re.tile.toPosX(88)).to.eql(80);
    });
    it("toPosY", function() {
      expect(re.tile.toPosY(88, 40)).to.eql(80);
      re.tile.sizeY = 40;
      return expect(re.tile.toPosY(88)).to.eql(80);
    });
    it("toTile", function() {
      e = re.tile.toTile(88, 40);
      expect(e.tileX).to.eql(2);
      return expect(e.tileY).to.eql(1);
    });
    it("toTileX", function() {
      expect(re.tile.toTileX(88)).to.eql(2);
      re.tile.sizeX = 40;
      return expect(re.tile.toTileX(88)).to.eql(2);
    });
    it("toTileY", function() {
      expect(re.tile.toTileY(88, 40)).to.eql(2);
      re.tile.sizeY = 40;
      return expect(re.tile.toTileY(88)).to.eql(2);
    });
    it("tile", function() {
      e.sizeX = 40;
      e.sizeY = 40;
      expect(e.tile(1, 1)).to.exist;
      expect(e.posX).to.eql(40);
      expect(e.posY).to.eql(40);
      expect(e.tile({
        x: 2,
        y: 1
      })).to.exist;
      expect(e.posX).to.eql(80);
      expect(e.posY).to.eql(40);
      expect(e.tile({
        posX: 2 * e.sizeX,
        posY: 2 * e.sizeY
      })).to.exist;
      expect(e.posX).to.eql(80);
      return expect(e.posY).to.eql(80);
    });
    it("tileX", function() {
      expect(e.tileX(2)).to.exist;
      return expect(e.tileX()).to.eql(2);
    });
    return it("tileY", function() {
      expect(e.tileY(2)).to.exist;
      return expect(e.tileY()).to.eql(2);
    });
  });

}).call(this);
