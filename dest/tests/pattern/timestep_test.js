(function() {
  describe("timestep", function() {
    var e;

    e = void 0;
    beforeEach(function() {
      return e = re.e("timestep");
    });
    return it("should call twice", function() {
      var calls;

      e.stepSize = 100;
      calls = 0;
      e.timestep(200, function() {
        return calls++;
      });
      return expect(calls).to.eql(2);
    });
  });

}).call(this);
