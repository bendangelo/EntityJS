(function() {
  describe("drag", function() {
    var e;

    e = void 0;
    beforeEach(function() {
      return e = re.e("drag");
    });
    return it("drag", function() {
      var called, called2, called3;

      called = void 0;
      called2 = void 0;
      called3 = void 0;
      e.on("drag:start", function() {
        return called = true;
      }).on("drag:update", function() {
        return called2 = true;
      }).on("drag:finish", function() {
        return called3 = true;
      });
      expect(e.dragStart(0, 0)).to.exist;
      expect(e.dragging).to.be.ok();
      expect(called).to.be.ok();
      expect(e.dragUpdate(10, 0)).to.exist;
      expect(called2).to.be.ok();
      expect(e.dragFinish()).to.exist;
      return expect(called3).to.be.ok();
    });
  });

}).call(this);
