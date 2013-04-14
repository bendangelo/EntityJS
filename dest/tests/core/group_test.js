(function() {
  describe("group", function() {
    var s;

    s = void 0;
    re.g("base").defines({
      blah: 99
    });
    re.g("monsters").requires("base").defines({
      findAt: function(x, y) {
        return this.find(function(e) {
          return e.x === x && e.y === y;
        });
      }
    });
    return it("should create new group", function() {
      var mon, val;

      val = 10;
      re.g("monsters").create([val]);
      expect(re("monsters").first(), val).to.be.ok();
      mon = re.e("monsters").attr({
        x: 10,
        y: 3
      });
      expect(re("monsters").findAt(10, 3).x).toEqual(mon.x);
      return expect(re("monsters").get("blah")).toEqual(99);
    });
  });

}).call(this);
