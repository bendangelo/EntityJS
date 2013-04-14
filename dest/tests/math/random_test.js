(function() {
  describe("random", function() {
    it("random 0-1", function() {
      var i, n, _results;

      i = 100;
      _results = [];
      while (i--) {
        n = re.random();
        expect(n >= 0).to.be.ok();
        _results.push(expect(n <= 1).to.be.ok());
      }
      return _results;
    });
    it("random 0-3", function() {
      var i, n, _results;

      i = 100;
      _results = [];
      while (i--) {
        n = re.random(3);
        expect(n >= 0).to.be.ok();
        _results.push(expect(n <= 3).to.be.ok());
      }
      return _results;
    });
    it("should get one or the other", function() {
      var first, i, n, second;

      first = false;
      second = false;
      i = 100;
      while (i--) {
        n = re.random([-10, 10]);
        if (n === 10) {
          first = true;
        }
        if (n === -10) {
          second = true;
        }
        expect(n === -10 || n === 10).to.be.ok();
      }
      expect(first).to.be.ok();
      return expect(second).to.be.ok();
    });
    it("random -10 to 10", function() {
      var i, n, _results;

      i = 100;
      _results = [];
      while (i--) {
        n = re.random(-10, 10);
        expect(n >= -10).to.be.ok();
        _results.push(expect(n <= 10).to.be.ok());
      }
      return _results;
    });
    return it("random prop from object", function() {
      var obj, prop;

      obj = {
        ok: 10,
        blah: 2,
        t: 3
      };
      prop = re.random(obj);
      return expect(prop === "ok" || prop === "blah" || prop === "t").to.be.ok();
    });
  });

}).call(this);
