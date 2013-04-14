(function() {
  describe("system", function() {
    var s;

    s = void 0;
    re.s("base").defines({
      blah: 99
    });
    re.s("render2").requires("base").defines({
      process: function(e) {
        return e.ok = 10;
      }
    });
    return it("should process all entities", function() {
      s = re.s("render2").create([{}, {}]);
      s.processAll();
      expect(s.entities[0].ok).toEqual(10);
      expect(s.entities[1].ok).toEqual(10);
      return expect(s.get("blah")).toEqual(99);
    });
  });

}).call(this);
