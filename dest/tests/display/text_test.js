(function() {
  describe("text", function() {
    var f;

    f = void 0;
    beforeEach(function() {
      return f = re.e("text");
    });
    afterEach(function() {
      return f.dispose();
    });
    it("text", function() {
      expect(f.text("pl")).to.be.ok();
      return expect(f.text()).to.eql("pl");
    });
    it("visible", function() {
      expect(f.text("ok")).to.exist;
      expect(f.visible()).to.be.ok();
      expect(f.text("")).to.exist;
      return expect(f.visible()).to.not.be.ok();
    });
    it("should join strings", function() {
      f.text("blah", 10, "nice");
      return expect(f.text()).to.eql("blah 10 nice");
    });
    return it("should draw", function() {
      f.text("m\nlinesdfsdfsdfsdsdfsdfsdfsdfsdfsfsf");
      expect(f.draw(re.loop().context)).to.exist;
      return expect(f.sizeX > 40).to.be.ok();
    });
  });

}).call(this);
