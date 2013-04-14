(function() {
  describe("cycle/wait", function() {
    var wait;

    wait = void 0;
    beforeEach(function() {
      return wait = re.e("wait");
    });
    return it("should wait", function() {
      var called;

      called = false;
      runs(function() {
        return expect(wait.wait(function() {
          return called = true;
        }, 100));
      });
      waits(101);
      return runs(function() {
        return expect(called).to.be.ok();
      });
    });
  });

}).call(this);
