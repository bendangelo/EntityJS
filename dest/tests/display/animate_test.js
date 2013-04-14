(function() {
  describe("display/animate", function() {
    var e;

    e = void 0;
    beforeEach(function() {
      return e = re.e("animate");
    });
    return it("should animate", function() {
      return expect(e.animate()).to.exist;
    });
  });

}).call(this);
