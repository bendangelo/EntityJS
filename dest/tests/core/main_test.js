(function() {
  describe("main", function() {
    var s;

    s = void 0;
    beforeEach(function() {
      return s = re.loop();
    });
    it("init", function() {
      return expect(s.context).to.exist;
    });
    it("clear", function() {
      expect(s.start()).to.exist;
      spyOn(s.context, "fillRect");
      expect(s.clear("#FF0000")).to.exist;
      called(s.context.fillRect);
      expect(s.clear("rgb(200, 0, 0)")).to.exist;
      called(s.context.fillRect);
      expect(s.clear()).to.exist;
      return expect(s.stop()).to.exist;
    });
    return it("loop", function() {
      var called;

      called = false;
      s.attr({
        loop: function() {
          return called = true;
        }
      }).start().stop();
      s.loop();
      return expect(called).to.be.ok();
    });
  });

}).call(this);
