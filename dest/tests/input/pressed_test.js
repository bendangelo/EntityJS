(function() {
  describe("pressed", function() {
    it("single pressed", function() {
      expect(re.pressed("d")).to.not.be.ok();
      re.pressed.d["d"] = true;
      expect(re.pressed("d")).to.be.ok();
      return re.pressed.d["d"] = false;
    });
    return it("multi pressed", function() {
      var a;

      a = ["d", "w"];
      expect(re.pressed(a)).to.not.be.ok();
      re.pressed.d["d"] = true;
      expect(re.pressed(a)).to.be.ok();
      re.pressed.d["d"] = false;
      re.pressed.d["w"] = true;
      expect(re.pressed(a)).to.be.ok();
      return re.pressed.d["w"] = false;
    });
  });

}).call(this);
