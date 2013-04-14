(function() {
  describe("test", function() {
    it("create new game scene", function() {
      var called, val1, val2;

      called = false;
      val1 = void 0;
      val2 = void 0;
      re.scene("game").enter(function(t, c) {
        called = true;
        val1 = t;
        return val2 = c;
      });
      expect(re.scene.current == null).to.be.ok();
      re.scene("game").enter(10, "sd");
      expect(re.scene.current).to.eql("game");
      expect(called).to.be.ok();
      expect(val1).to.eql(10);
      return expect(val2).to.eql("sd");
    });
    it("should exit properly", function() {
      var called, val1, val2;

      called = false;
      val1 = void 0;
      val2 = void 0;
      re.scene("bob").exit(function(cal, s) {
        called = true;
        val1 = cal;
        return val2 = s;
      });
      re.scene("bob").exit(10, "s");
      expect(called).to.be.ok();
      expect(val1).to.eql(10);
      expect(val2).to.eql("s");
      return expect(re.scene()).to.eql(null);
    });
    return it("should exit once", function() {
      var called;

      called = 0;
      re.scene("bob").exit(function() {
        return called++;
      }).enter();
      re.scene("blah").enter(10);
      return expect(called).to.eql(1);
    });
  });

}).call(this);
