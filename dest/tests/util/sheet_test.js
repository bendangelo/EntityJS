(function() {
  describe("sheet", function() {
    return it("create sheet", function() {
      var e;

      is_(re.sheet({
        rock: [1, 2],
        water: [0, 2]
      }, "accept.png", 2, 2), "array");
      e = re.e("rock");
      expect(e.sizeX).to.eql(2);
      expect(e.sizeY).to.eql(2);
      expect(e.frameX).to.eql(1);
      expect(e.frameY).to.eql(2);
      e = re.e("water");
      expect(e.sizeX).to.eql(2);
      expect(e.sizeY).to.eql(2);
      expect(e.frameX).to.eql(0);
      return expect(e.frameY).to.eql(2);
    });
  });

}).call(this);
