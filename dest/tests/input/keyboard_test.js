(function() {
  describe("keyboard", function() {
    var e, keyboard;

    e = void 0;
    keyboard = void 0;
    beforeEach(function() {
      keyboard = re.s("keyboard").create();
      return e = re.e("keyboard");
    });
    it("keydown listen", function() {
      var called, called2, type;

      type = "keydown";
      called = void 0;
      called2 = void 0;
      e.on(type, function(key, e) {
        expect(e).to.exist;
        return called = key;
      });
      e.on(type + ":r", function(key, e) {
        expect(e).to.exist;
        return called2 = key;
      });
      keyboard.event({
        type: type,
        keyCode: 68
      });
      expect(called).to.eql("d");
      expect(called2).to.eql(null);
      keyboard.event({
        type: type,
        keyCode: 82
      });
      expect(called).to.eql("r");
      return expect(called2).to.eql("r");
    });
    return it("keyup listen", function() {
      var called, called2, type;

      type = "keyup";
      called = void 0;
      called2 = void 0;
      e.on(type, function(key, e) {
        expect(e).to.exist;
        return called = key;
      });
      e.on(type + ":r", function(key, e) {
        expect(e).to.exist;
        return called2 = key;
      });
      keyboard.event({
        type: type,
        keyCode: 68
      });
      expect(called).to.eql("d");
      expect(called2).to.eql(null);
      keyboard.event({
        type: type,
        keyCode: 82
      });
      expect(called).to.eql("r");
      return expect(called2).to.eql("r");
    });
  });

}).call(this);
