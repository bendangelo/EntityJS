(function() {
  describe("image", function() {
    var i, image_comp;

    i = void 0;
    image_comp = void 0;
    beforeEach(function() {
      image_comp = f("image");
      return i = re.e(["image", image_comp.name]);
    });
    it("image", function() {
      expect(i.image()).to.exist;
      expect(i.image(image_comp.image)).to.exist;
      return expect(i.image()).to.eql(image_comp.image);
    });
    it("visible", function() {
      expect(i.visible()).to.be.ok();
      i._image = null;
      return expect(i.visible()).to.not.be.ok();
    });
    return it("draw", function() {
      return expect(i.draw(re.loop().context)).to.exist;
    });
  });

}).call(this);
