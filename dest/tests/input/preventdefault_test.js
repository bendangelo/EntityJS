(function() {
  describe("input/preventdefault", function() {
    return it("should save prevent default", function() {
      var d;

      d = "left right";
      re.preventDefault(d);
      expect(re.preventDefault.d["left"]).to.be.ok();
      return expect(re.preventDefault.d["right"]).to.be.ok();
    });
  });

}).call(this);
