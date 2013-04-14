(function() {
  describe("sound", function() {
    var e;

    e = void 0;
    beforeEach(function() {
      return e = re.e("sound alligator.sfx");
    });
    it("play", function() {
      var called, k;

      called = false;
      k = e.on("sound:finish", function() {
        return called = true;
      });
      expect(e.play()).to.exist;
      waits(1500);
      return runs(function() {
        return expect(called).to.be.ok();
      });
    });
    it("currenttime", function() {});
    return it("ended", function() {});
  });

}).call(this);
