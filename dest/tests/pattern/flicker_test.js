(function() {
  describe("flicker", function() {
    var e;

    e = void 0;
    beforeEach(function() {
      return e = re.e().set({
        health: 0,
        flick: function(v) {
          return this.health += v;
        }
      }).comp("flicker");
    });
    it("flicker", function() {
      var called, called2, called3, i, time;

      time = 4;
      called = false;
      called2 = false;
      called3 = false;
      e.on("flicker:start", function() {
        return called = true;
      }).on("flicker:finish", function(v) {
        called2 = true;
        return expect(v, "string").to.exist;
      }).on("flicker:update", function(f, i, array, loop_) {
        expect(f).to.exist;
        expect(i).to.exist;
        expect(array).to.exist;
        expect(loop_).to.exist;
        return called3 = true;
      });
      e.flicker(time, [5, 5, 5, 5], 1, "heal");
      expect(e.flickering("heal")).to.be.ok();
      expect(e.flickering()).to.be.ok();
      expect(called).to.be.ok();
      i = 0;
      while (i < 60 * time) {
        e.flicker_update(re.loop().stepSize);
        i++;
      }
      expect(e.health).to.eql(20);
      expect(called2).to.be.ok();
      return expect(called3).to.be.ok();
    });
    return it("should flicker correctly", function() {
      var i;

      e.flicker(1, [5]);
      i = 0;
      while (i < 3) {
        e.flicker_update(e.stepSize * 0.5);
        i++;
      }
      return expect(e.health).to.eql(5);
    });
  });

}).call(this);
