(function() {
  describe("ticker", function() {
    return it("tick", function() {
      var t;

      t = re.e("tick");
      waits(100);
      runs(function() {
        return expect(t.tick().toString()).to.match(/[0-9]*/);
      });
      waits(80);
      return runs(function() {
        return expect(t.tick().toString()).to.match(/[0-9]*/);
      });
    });
  });

}).call(this);
