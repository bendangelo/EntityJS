(function() {
  describe("imgtext", function() {
    var e;

    e = void 0;
    beforeEach(function() {
      re.c("serif").requires(["imgtext", f("image").name]).defines("imgtext", [1, 2, 3, 4, 3, 4, 5, 6, 7, 8, 9, 4, 5, 3, 4, 5, 6, 7, 2, 3, 4, 5]);
      return e = re.e("serif").set("text", "blah");
    });
    it("visible", function() {
      expect(e.visible()).to.be.ok();
      e._text = null;
      return expect(e.visible()).to.not.be.ok();
    });
    it("draw", function() {
      return expect(e.draw(re.loop().context)).to.exist;
    });
    return it("text", function() {
      expect(e.text()).to.eql("blah");
      expect(e.text("new")).to.eql(e);
      return expect(e.text()).to.eql("new");
    });
  });

}).call(this);
