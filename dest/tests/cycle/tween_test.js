(function() {
  describe("cycle/tween", function() {
    var tween;

    tween = void 0;
    beforeEach(function() {
      tween = re.e("tween");
      tween.x = 0;
      return tween.y = 0;
    });
    it("should move object", function() {
      var called, calledFinish, calledUpdate, i;

      called = false;
      calledUpdate = false;
      calledFinish = false;
      tween.on("tween:update", function() {
        return calledUpdate = true;
      });
      tween.on("tween:finish", function() {
        return calledFinish = true;
      });
      tween.on("tween:start", function() {
        return called = true;
      });
      tween.tween(0, {
        x: 100
      });
      i = 60;
      while (i--) {
        tween.tween_update(re.loop().stepSize);
      }
      expect(tween.x).to.eql(100);
      expect(called).to.be.ok();
      expect(calledUpdate).to.be.ok();
      return expect(calledFinish).to.be.ok();
    });
    return it("should move object in 60ms", function() {
      var i, step;

      tween.comp("tile");
      tween.x = -10;
      tween.tween(1, {
        x: 50,
        tileY: 10
      });
      step = re.loop().stepSize;
      tween.tween_time = tween.tween_t * 0.5;
      tween.tween_update(step);
      expect(tween.x).to.eql(21.62);
      i = 60;
      while (i--) {
        tween.tween_update(step);
      }
      expect(tween.x).to.eql(50);
      return expect(tween.tileY()).to.eql(10);
    });
  });

}).call(this);
