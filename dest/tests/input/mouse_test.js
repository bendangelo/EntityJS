(function() {
  describe("mouse", function() {
    var e, mouse;

    e = void 0;
    mouse = void 0;
    beforeEach(function() {
      mouse = re.s("mouse").create($("canvas")[0]);
      return e = re.e("mouse");
    });
    it("mousedown", function() {
      var called, called2, type;

      type = "mousedown";
      called = void 0;
      called2 = void 0;
      e.on(type, function(x, y, e) {
        called = true;
        expect(x).to.exist;
        expect(y).to.exist;
        return expect(e).to.exist;
      });
      e.on(type + ":middle", function(m, e) {
        called2 = true;
        return expect(m).to.exist;
      });
      mouse.event({
        type: type,
        offsetX: 0,
        offsetY: 0
      }, "middle");
      expect(called2).to.be.ok();
      return expect(called).to.be.ok();
    });
    it("mouseup", function() {
      var called, called2, type;

      type = "mouseup";
      called = void 0;
      called2 = void 0;
      e.on(type, function(x, y, e) {
        called = true;
        expect(x).to.exist;
        expect(y).to.exist;
        return expect(e).to.exist;
      });
      e.on(type + ":middle", function(m, e) {
        called2 = true;
        return expect(m).to.exist;
      });
      mouse.event({
        type: type,
        offsetX: 0,
        offsetY: 0
      }, "middle");
      expect(called2).to.be.ok();
      return expect(called).to.be.ok();
    });
    it("mousemove", function() {
      var called, type;

      type = "mousemove";
      called = void 0;
      e.on(type, function(x, y, e) {
        called = true;
        expect(x).to.exist;
        expect(y).to.exist;
        return expect(e).to.exist;
      });
      mouse.event({
        type: type,
        offsetX: 0,
        offsetY: 0
      });
      return expect(called).to.be.ok();
    });
    it("click", function() {
      var called, type;

      type = "click";
      called = void 0;
      e.on(type, function(x, y, e) {
        called = true;
        expect(e).to.exist;
        expect(x).to.exist;
        return expect(y).to.exist;
      });
      mouse.event({
        type: type,
        offsetX: 50,
        offsetY: 100
      });
      return expect(called).to.be.ok();
    });
    it("dblclick", function() {
      var called, type;

      type = "dblclick";
      called = void 0;
      e.on(type, function(x, y, e) {
        called = true;
        expect(x).to.exist;
        expect(y).to.exist;
        return expect(e).to.exist;
      });
      mouse.event({
        type: type,
        offsetX: 0,
        offsetY: 0
      });
      return expect(called).to.be.ok();
    });
    return it("contextmenu", function() {
      var called, type;

      type = "contextmenu";
      called = void 0;
      e.on(type, function(x, y, e) {
        called = true;
        expect(x).to.exist;
        expect(y).to.exist;
        return expect(e).to.exist;
      });
      mouse.event({
        type: type,
        offsetX: 0,
        offsetY: 0
      });
      return expect(called).to.be.ok();
    });
  });

}).call(this);
