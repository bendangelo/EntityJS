(function() {
  describe("force", function() {
    var e;

    e = void 0;
    beforeEach(function() {
      return e = re.e("force");
    });
    it("isIdle", function() {
      expect(e.isIdle()).to.be.ok();
      e.velY = 0;
      e.accX = 0;
      e.accY = 0;
      e.velX = 1;
      expect(e.isIdle()).to.not.be.ok();
      e.velY = 0;
      e.accX = 0;
      e.accY = 1;
      e.velX = 0;
      expect(e.isIdle()).to.not.be.ok();
      e.velY = 0;
      e.accX = 1;
      e.accY = 0;
      e.velX = 0;
      expect(e.isIdle()).to.not.be.ok();
      e.velY = 1;
      e.accX = 0;
      e.accY = 0;
      e.velX = 0;
      expect(e.isIdle()).to.not.be.ok();
      e.velY = 0;
      e.accX = 0;
      e.accY = 0;
      e.velX = 0;
      expect(e.isIdle()).to.be.ok();
      e.velY = 2;
      return expect(e.isIdle(2)).to.be.ok();
    });
    it("force", function() {
      var i, _results;

      i = 10;
      _results = [];
      while (i--) {
        _results.push(expect(e.force(10, i, 0.5, i, 2)).to.eql((10 + i) * 0.5 + i * 2));
      }
      return _results;
    });
    it("forceVel", function() {
      var i, _results;

      i = 10;
      _results = [];
      while (i--) {
        _results.push(expect(e.forceVel(5, i, 0.5)).to.eql((5 + i) * 0.5));
      }
      return _results;
    });
    it("forceGra", function() {
      var i, _results;

      i = 10;
      _results = [];
      while (i--) {
        _results.push(expect(e.forceGra(i + 10, i)).to.eql((i + 10) * i));
      }
      return _results;
    });
    it("forceRes", function() {
      var i, _results;

      i = 50;
      _results = [];
      while (i -= 5) {
        _results.push(expect(e.forceRes(i, 3)).to.eql(i * -3));
      }
      return _results;
    });
    it("update being called", function() {
      var called;

      called = false;
      e.on("aftermath", function() {
        return called = true;
      });
      e.trigger("update");
      return expect(called).to.be.ok();
    });
    it("aftermath", function() {
      var called;

      called = false;
      e.on("aftermath", function() {
        return called = true;
      });
      expect(e.aftermath(10, 10, false, false)).to.exist;
      expect(e.posX).to.eql(10);
      expect(e.posY).to.eql(10);
      expect(called).to.be.ok();
      e.aftermath(15, 15, true, true);
      expect(e.velX === 15).to.not.be.ok();
      return expect(e.velY === 15).to.not.be.ok();
    });
    it("should update with hitmap", function() {
      var called, hitmap;

      called = false;
      hitmap = {
        checkHit: function() {
          called = true;
          return true;
        }
      };
      e.hitmap = hitmap;
      e.velX = 1;
      e.velY = 1;
      e.force_update();
      expect(e.posX === 0).to.not.be.ok();
      expect(e.posY === 0).to.not.be.ok();
      return expect(called).to.be.ok();
    });
    return it("should update with no hitmap", function() {
      e.hitmap = null;
      e.force_update();
      expect(e.posX).to.eql(e.posX + e.velX);
      return expect(e.posY).to.eql(e.posY + e.velY);
    });
  });

}).call(this);
